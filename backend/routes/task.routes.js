import express from 'express';
import { createTask, updateTask } from '../controllers/task.controller.js';
import { adminauth } from '../middleware/auth.adminMiddleware.js';
const router = express.Router();

router.post('/createTask',adminauth, createTask);
router.patch('/updateTask/:id/:status', updateTask);

export default router;