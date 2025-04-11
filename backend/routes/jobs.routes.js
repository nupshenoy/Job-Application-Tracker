import express from "express";
const router = express.Router();
import { getJobs, updateJob, createJob, deleteJob } from "../controllers/job.controller.js";

// Create Job
router.post('/', createJob);

// Get All Jobs
router.get('/', getJobs);

// Update Job
router.put('/:id', updateJob);

// Delete Job
router.delete('/:id', deleteJob);


export default router;
