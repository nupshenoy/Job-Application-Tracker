import express from "express";
const router = express.Router();
import { getJobs, updateJob, createJob, deleteJob, updateStatus } from "../controllers/job.controller.js";

import authMiddleware from '../middlewares/authMiddleware.js';

router.use(authMiddleware);

// Create Job
router.post('/', createJob);

// Get All Jobs
router.get('/', getJobs);

// Update Job
router.patch('/:id', updateJob);

// Delete Job
router.delete('/:id', deleteJob);

//Patch Status
router.patch('/:id', updateStatus);



export default router;
