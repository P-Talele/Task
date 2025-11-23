
import { Router } from 'express';
import { AuthController } from './controller';
import { validateDTO } from './../../middlewares/validate.middleware';
import { RegisterDTO } from './dto/register.dto';
import { LoginDTO } from './dto/login.dto';
const router = Router();

const controller = new AuthController();


router.post('/register', validateDTO(RegisterDTO), (req, res) => controller.register(req, res));
router.post('/login', validateDTO(LoginDTO), (req, res) => controller.login(req, res));


export default router;