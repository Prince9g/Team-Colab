import express from 'express';
import { Login, Signup,profile} from '../controllers/user.controller.js';

const router = express.Router();

router.post('/signup', Signup);
router.post('/login', Login);
router.get('/profile',profile)

export default router;