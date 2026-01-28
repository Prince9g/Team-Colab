import express from 'express';

const router = express.Router();

router.post('/createTask', createTask);
router.post('/updateTask/:id', updateTask);

export default router;