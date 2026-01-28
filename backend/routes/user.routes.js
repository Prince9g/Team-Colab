import express from 'express';
import { getTask, Login, Signup,profile, getAllTasks, getalluser,logout} from '../controllers/user.controller.js';
import { auth } from '../middleware/auth.middleware.js';
const router = express.Router();

router.post('/signup', Signup);
router.post('/login', Login);
router.get('/profile',auth,profile)
router.get('/getUserTask/:id', getTask);
router.get('/allTasks', getAllTasks);
router.get('/getalluser',getalluser);
router.post('/logout',auth,logout);

export default router;