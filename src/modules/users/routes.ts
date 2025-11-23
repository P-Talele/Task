
import { Router } from 'express';
import { UserController } from './controller';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { requireRole } from '../../middlewares/role.middleware';
import { Role } from '../../config';


const router = Router();
const controller = new UserController();


router.get('/', authMiddleware, requireRole(Role.Admin), (req, res) => controller.list(req, res));
router.get('/:id', authMiddleware, requireRole(Role.Admin), (req, res) => controller.get(req, res));
router.put('/:id/role', authMiddleware, requireRole(Role.Admin), (req, res) => controller.updateRole(req, res));


export default router;
