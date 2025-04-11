import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import jobRoutes from './routes/jobs.routes.js';
import cors from "cors";

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

app.use('/jobs', jobRoutes);


const PORT = process.env.port || 5000;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server started at http://localhost:${PORT}`);
});




//