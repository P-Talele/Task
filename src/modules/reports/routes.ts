import { Router } from 'express';
import { ReportController } from './controller';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { requireRole } from '../../middlewares/role.middleware';
import { Role } from '../../config';


const router = Router();
const controller = new ReportController();


router.get('/most-borrowed', authMiddleware, requireRole(Role.Admin), (req, res) => controller.mostBorrowed(req, res));
router.get('/active-members', authMiddleware, requireRole(Role.Admin), (req, res) => controller.activeMembers(req, res));
router.get('/availability', authMiddleware, requireRole(Role.Admin), (req, res) => controller.availability(req, res));


export default router;
