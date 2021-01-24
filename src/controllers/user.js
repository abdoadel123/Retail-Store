import boom from "@hapi/boom";
import { ProductModule } from "../modules/products";
import { UserModule } from "../modules/users";

let UserController = {
  async getBill(req, res, next) {
    let userId = req.params.id;
    let { products } = req.body;

    let user = await UserModule.getById(userId);
    if (!user) {
      return next(boom.notFound("User not found"));
    }

    let groceriesTotal = 0,
      nongroceriesTotal = 0,
      total = 0;

    products = products.map((product, index) => {
      let productObj = ProductModule.getById(product.productId);
      if (!productObj)
        return res.status(404).send({
          isSuccessed: false,
          data: null,
          error: `Product ${index + 1} not found`,
        });

      if (productObj.type == "GROCERIES")
        groceriesTotal += product.quantity * productObj.price;
      else nongroceriesTotal += product.quantity * productObj.price;

      return {
        product: productObj,
        quantity: product.quantity,
      };
    });

    if (user.type == "EMPLOYEE")
      total =
        groceriesTotal + (nongroceriesTotal - (nongroceriesTotal * 30) / 100);
    else if (user.type == "AFFILIATE")
      total =
        groceriesTotal + (nongroceriesTotal - (nongroceriesTotal * 10) / 100);
    else if (
      user.type == "NORMAL" &&
      new Date().getFullYear() - new Date(user.customer_since).getFullYear() >=
        2
    )
      total =
        groceriesTotal + (nongroceriesTotal - (nongroceriesTotal * 5) / 100);
    else total = groceriesTotal + nongroceriesTotal;

    total = total - 5 * parseInt(total / 100);

    return res.status(201).send({
      isSuccessed: true,
      data: {
        products: products,
        totalBill: total,
      },
      error: null,
    });
  },
};
export { UserController };
