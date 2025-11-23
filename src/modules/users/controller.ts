import { Request, Response } from "express";
import { UserService } from "./service";
import { message } from "../../helper/messages";

export class UserController {
    private service: UserService;

    constructor() {
        this.service = new UserService();
    }

    async list(req: Request, res: Response) {
        try {
            const page = Number(req.query.page || 1);
            const limit = Number(req.query.limit || 20);

            const data = await this.service.list(page, limit);

            return res.json({
                code: 200,
                success: true,
                data
            });
        } catch (error: any) {
            return res.status(400).json({
                code: 400,
                success: false,
                message: error.message
            });
        }
    }

    async get(req: Request, res: Response) {
        try {
            const user = await this.service.getById(req.params.id);

            if (!user) {
                return res.status(404).json({
                    code: 404,
                    success: false,
                    message: message.user.User_not_found
                });
            }

            return res.json({
                code: 200,
                success: true,
                data: user
            });
        } catch (error: any) {
            return res.status(400).json({
                code: 400,
                success: false,
                message: error.message
            });
        }
    }

    async updateRole(req: Request, res: Response) {
        try {
            const updated = await this.service.updateRole(req.params.id, req.body.role);

            return res.json({
                code: 200,
                success: true,
                data: updated
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
