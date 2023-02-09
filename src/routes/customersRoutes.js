import { Router } from "express";
import {listCustomers,createCustomer, listCustomersById} from "../controllers/customersController.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { createCustomerSchema } from "../schema/createCustomerSchema.js";

const customersRouter = Router();

customersRouter.get("/customers", listCustomers);
customersRouter.get("/customers/:id", listCustomersById);
customersRouter.post("/customers",validateSchema(createCustomerSchema),createCustomer);

export default customersRouter;
