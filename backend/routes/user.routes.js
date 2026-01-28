import express from 'express';
import { getTask, Login, Signup } from '../controllers/user.controller.js';

const router = express.Router();

router.post('/signup', Signup);
router.post('/login', Login);
router.get('/getUserTask/:id', getTask);

export default router;