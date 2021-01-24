import { Router } from "express";
import { UserController } from "../controllers/user";
import { BillValidationWares } from "../middleware/bill";

const router = Router();

router
  .route("/:id/bill")
  .post(BillValidationWares.billBody, UserController.getBill);

export { router };
