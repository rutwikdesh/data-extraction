// IMPORTS
import express from "express";
import cors from "cors";
import morgan from "morgan";

// EXPRESS INIT
const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

// API ROUTES
app.get("/generate-csv", (req, res) => {});
