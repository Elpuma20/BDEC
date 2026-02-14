import { Router } from 'express';
import { getAllJobs, createJob, deleteJob } from '../controllers/jobController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.get('/', getAllJobs);
router.post('/', authMiddleware, createJob);
router.delete('/:id', authMiddleware, deleteJob);

export default router;
