import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/database";
import { container } from "./config/container"; 

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/tasks", container.getTaskRoutes().getRouter());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
