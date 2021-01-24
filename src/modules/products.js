import { ProductsModel } from "../models/products";

let ProductModule = {
  getById(id) {
    let product = ProductsModel.filter((product) => {
      return product.id == id;
    });
    if (product.length <= 0) return null;
    return product[0];
  },
};

export { ProductModule };
