import { Request, Response } from "express";
import { ReportService } from "./service";

export class ReportController {
    private service: ReportService;

    constructor() {
        this.service = new ReportService();
    }

    async mostBorrowed(req: Request, res: Response) {
        try {
            const limit = Number(req.query.limit || 10);
            const data = await this.service.mostBorrowed(limit);
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

    async activeMembers(req: Request, res: Response) {
        try {
            const limit = Number(req.query.limit || 10);
            const data = await this.service.activeMembers(limit);
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

    async availability(req: Request, res: Response) {
        try {
            const data = await this.service.availabilitySummary();
            return res.json({
                code: 200,
                success: true,
                data: data[0] || { totalBooks: 0, availableBooks: 0, borrowedBooks: 0 }
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
