import express from "express";
const router = express.Router();
import { getJobs, updateJob, createJob, deleteJob, updateStatus } from "../controllers/job.controller.js";

// Create Job
router.post('/', createJob);

// Get All Jobs
router.get('/', getJobs);

// Update Job
router.put('/:id', updateJob);

// Delete Job
router.delete('/:id', deleteJob);

//Patch Status
router.patch('/:id', updateStatus);


export default router;
