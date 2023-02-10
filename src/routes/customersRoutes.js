import { Router } from "express";
import {listCustomers,createCustomer, listCustomersById, updateCustomer} from "../controllers/customersController.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { customerSchema } from "../schema/customerSchema.js";

const customersRouter = Router();

customersRouter.get("/customers", listCustomers);
customersRouter.get("/customers/:id", listCustomersById);
customersRouter.post("/customers",validateSchema(customerSchema),createCustomer);
customersRouter.put("/customers/:id", validateSchema(customerSchema),updateCustomer);

export default customersRouter;
