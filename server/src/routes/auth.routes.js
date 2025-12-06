import   express  from 'express';
import { login, logout, profile, register } from '../controller/auth.controller.js';
import  authMiddleware  from '../middlewares/auth.middlewares.js';


const authRoutes = express.Router();

authRoutes.post('/login', login);
authRoutes.post('/register',register );
authRoutes.get('/logout', authMiddleware, logout);
authRoutes.get('/profile', authMiddleware, profile);

export default authRoutes