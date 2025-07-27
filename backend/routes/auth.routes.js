import express from 'express';
import { register, login} from '../controllers/auth.controller.js'
import profileRoutes from './profile.routes.js'
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.use('/profile', profileRoutes)

export default router;

