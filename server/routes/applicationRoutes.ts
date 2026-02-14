import { Router } from 'express';
import { applyToJob, getMyApplications, getAllApplications, getAdminStats, deleteApplication } from '../controllers/applicationController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.post('/', authMiddleware, applyToJob);
router.get('/my', authMiddleware, getMyApplications);
router.get('/', authMiddleware, getAllApplications);
router.get('/stats', authMiddleware, getAdminStats);
router.delete('/:id', authMiddleware, deleteApplication);

export default router;
