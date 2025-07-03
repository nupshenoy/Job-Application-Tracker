import express from 'express';
import { register, login, getProfile, updateProfile,  deleteProfile} from '../controllers/auth.controller.js'
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get("/profile", authMiddleware,  getProfile);
router.put("/profile",  authMiddleware,  updateProfile);
router.delete("/profile",  authMiddleware, deleteProfile);


export default router;

