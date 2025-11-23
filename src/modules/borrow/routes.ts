import { Router } from 'express';
import { BorrowController } from './controller';
import { authMiddleware } from '../../middlewares/auth.middleware';


const router = Router();
const controller = new BorrowController();


router.post('/:bookId', authMiddleware, (req, res) => controller.borrow(req, res));
router.post('/return/:bookId', authMiddleware, (req, res) => controller.returnBook(req, res));
router.get('/history', authMiddleware, (req, res) => controller.history(req, res));


export default router;