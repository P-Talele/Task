
import { Request, Response, NextFunction } from 'express';


export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {

    const code = err.status || 500;
    const message = err.message;
    res.status(code).json({ code, message });
}
