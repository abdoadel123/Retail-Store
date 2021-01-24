import boom from "@hapi/boom";
import { BillValidationSchemas } from "../utils/validation";

const BillValidationWares = {
  async billBody(req, res, next) {
    const { error } = BillValidationSchemas.billBody.validate(req.body);
    if (error) {
      return next(boom.badData(error.details[0].message));
    }
    next();
  },
};

export { BillValidationWares };
