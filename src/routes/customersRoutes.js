import { Router } from "express";
import {listCustomers,createCustomer,} from "../controllers/customersController.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { createCustomerSchema } from "../schema/createCustomerSchema.js";

const customersRouter = Router();

customersRouter.get("/customers", listCustomers);
customersRouter.post("/customers",validateSchema(createCustomerSchema),createCustomer);

export default customersRouter;
