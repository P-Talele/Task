

import { Request, Response, NextFunction } from 'express';
import { Role } from '../config/index'
import { message } from '../helper/messages';



export function requireRole(role: Role.Admin | Role.Member) {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) return res.status(401).json({ message: message.error.Unauthorized });
        if (req.user.role !== role && role === Role.Admin) {
            return res.status(403).json({ message: message.error.Admins_only });
        }
        next();
    };
}
