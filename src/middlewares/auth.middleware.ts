import { Request, Response, NextFunction } from 'express';
import { verifyJwt } from '../utils/jwt';
import { Role } from './../config/index'
import { message } from './../helper/messages'





export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.headers.authorization;

        if (!token)
            return res.status(401).json({ message: message.error.Unauthorized });

 
        const payload = verifyJwt<{ sub: string; role: Role.Admin | Role.Member }>(token);

        req.user = { id: payload.sub, role: payload.role };
        next();
    } catch (err) {
        console.error(err);
        return res.status(401).json({ message: message.error.Invalid_token });
    }
}
