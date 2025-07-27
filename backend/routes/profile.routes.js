import express from 'express';
import {  getProfile, updateProfile,  deleteProfile} from '../controllers/auth.controller.js'
import protect from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get("/", protect,  getProfile);
router.put("/",  protect,  updateProfile);
router.delete("/",  protect, deleteProfile);

export default router;