import { Router } from "express";
import { listCostumers } from "../controllers/customersController.js";

const customersRouter = Router();

customersRouter.get("/customers", listCostumers);

export default customersRouter;
