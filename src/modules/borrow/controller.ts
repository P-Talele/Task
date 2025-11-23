import { Request, Response } from "express";
import { BorrowService } from "./service";

export class BorrowController {
    private service: BorrowService;

    constructor() {
        this.service = new BorrowService();
    }

    async borrow(req: Request, res: Response) {
        try {
            const userId = req.user!.id;
            const bookId = req.params.bookId;

            const record = await this.service.borrow(userId, bookId);

            return res.status(201).json({
                code: 201,
                success: true,
                data: record
            });
        } catch (error: any) {
            return res.status(400).json({
                code: 400,
                success: false,
                message: error.message
            });
        }
    }

    async returnBook(req: Request, res: Response) {
        try {
            const userId = req.user!.id;
            const bookId = req.params.bookId;

            const record = await this.service.returnBook(userId, bookId);

            return res.json({
                code: 200,
                success: true,
                data: record
            });
        } catch (error: any) {
            return res.status(400).json({
                code: 400,
                success: false,
                message: error.message
            });
        }
    }

    async history(req: Request, res: Response) {
        try {
            const userId = req.user!.id;

            const records = await this.service.history(userId);

            return res.json({
                code: 200,
                success: true,
                data: records
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
