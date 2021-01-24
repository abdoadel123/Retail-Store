import Joi from "joi";
import { errorsOverride } from "./JoiErrorOverriding";

const BillValidationSchemas = {
  billBody: Joi.object({
    products: Joi.array()
      .items({
        productId: Joi.string().required().error(errorsOverride),
        quantity: Joi.number().positive().required().error(errorsOverride),
      })
      .required()
      .error(errorsOverride),
  }),
};

export { BillValidationSchemas };
