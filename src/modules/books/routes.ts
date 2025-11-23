
import { Router } from 'express';
import { BookController } from './controller';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { requireRole } from '../../middlewares/role.middleware';
import { validateDTO } from '../../middlewares/validate.middleware';
import { CreateBookDTO } from './dto/create-book.dto';
import { UpdateBookDTO } from './dto/update-book.dto';
import { Role } from '../../config';

const router = Router();
const controller = new BookController();
//validateDTO(CreateBookDTO),


router.post('/create', authMiddleware, requireRole(Role.Admin), validateDTO(CreateBookDTO), (req, res) => controller.create(req, res));
router.put('/:id', authMiddleware, requireRole(Role.Admin), validateDTO(UpdateBookDTO), (req, res) => controller.update(req, res));
router.delete('/:id', authMiddleware, requireRole(Role.Admin), (req, res) => controller.delete(req, res));
router.get('/:id', authMiddleware, (req, res) => controller.get(req, res));
router.get('/', authMiddleware, (req, res) => controller.list(req, res));

export default router;