import { Router } from "express";
import { listRentals, createRental, returnRental, deleteRental} from "../controllers/rentalsController.js";
import { rentalSchema } from "../schema/rentalSchema.js";
import { validateSchema } from "../middlewares/validateSchema.js";

const rentalsRouter = Router();

rentalsRouter.get("/rentals", listRentals);
rentalsRouter.post("/rentals", validateSchema(rentalSchema), createRental );
rentalsRouter.post("/rentals/:id/return",  returnRental );
rentalsRouter.delete("/rentals/:id",  deleteRental );

export default rentalsRouter;
