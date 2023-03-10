import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import gamesRouter from "./routes/gamesRoutes.js";
import customersRouter from "./routes/customersRoutes.js";
import rentalsRouter from "./routes/rentalsRoutes.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.use([gamesRouter]);
app.use([customersRouter]);
app.use([rentalsRouter]);

app.listen(process.env.PORT, () =>
	console.log("Server running on port " + process.env.PORT)
);
