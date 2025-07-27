import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import jobRoutes from './routes/jobs.routes.js';
import authRoutes from './routes/auth.routes.js';
import resumeRoutes from './routes/resume.routes.js'
import cors from "cors";

dotenv.config();
const app = express();


app.use(express.json());
app.use(cors());

app.use('/jobs', jobRoutes);
app.use('/auth', authRoutes);
app.use('/resume', resumeRoutes)


const PORT = process.env.port || 5000;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server started at http://localhost:${PORT}`);
});

