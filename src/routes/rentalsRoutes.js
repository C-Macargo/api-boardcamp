import { Router } from "express";
import { listRentals, createRental } from "../controllers/rentalsController.js";
import { rentalSchema } from "../schema/rentalSchema.js";
import { validateSchema } from "../middlewares/validateSchema.js";

const rentalsRouter = Router();

rentalsRouter.get("/rentals", listRentals);
rentalsRouter.post("/rentals", validateSchema(rentalSchema), createRental );

export default rentalsRouter;
