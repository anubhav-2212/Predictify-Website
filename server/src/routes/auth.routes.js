import   express  from 'express';
import { login, logout, profile, register } from '../controller/auth.controllers.js';
import  authMiddleware  from '../middlewares/auth.middlewares.js';


const authRoutes = express.Router();

authRoutes.get('/login', login);
authRoutes.post('/register',register );
authRoutes.get('/logout', authMiddleware, logout);
authRoutes.get('/profile', authMiddleware, profile);

export default authRoutes