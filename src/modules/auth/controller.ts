import { Request, Response } from "express";
import { AuthService } from "./service";
import { message } from "./../../helper/messages";


export class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    async register(req: Request, res: Response) {
        try {
            const { name, email, password } = req.body;

            const result = await this.authService.register(name, email, password);

            return res.status(201).json({
                code: 201,
                success: true,
                message: message.auth.create,
                data: {}
            });
        } catch (error: any) {
            return res.status(400).json({
                code: 400,
                success: false,
                message: error.message
            });
        }
    }

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            const result = await this.authService.login(email, password);

            return res.json({
                code: 200,
                success: true,
                message: message.auth.login,
                data: result
            });
        } catch (error: any) {
            return res.status(400).json({
                code: 400,
                success: false,
                message: error.message
            });
        }
    }
}
