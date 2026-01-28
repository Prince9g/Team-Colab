import express from 'express';
import { createTask, updateTask } from '../controllers/task.controller.js';

const router = express.Router();

router.post('/createTask', createTask);
router.patch('/updateTask/:id', updateTask);

export default router;