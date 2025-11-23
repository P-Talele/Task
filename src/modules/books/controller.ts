import { Request, Response } from "express";
import { BookService } from "./service";
import { message } from "../../helper/messages";

export class BookController {
    private service: BookService;

    constructor() {
        this.service = new BookService();
    }

    async create(req: Request, res: Response) {
        try {

            const result = await this.service.create(req.body);

            return res.status(201).json({
                code: 201,
                success: true,
                message: message.book.book_Details,
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

    async update(req: Request, res: Response) {
        try {
            const result = await this.service.update(req.params.id, req.body);

            return res.status(201).json({
                code: 201,
                success: true,
                message: message.book.book_update,
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

    async delete(req: Request, res: Response) {
        try {
            await this.service.delete(req.params.id);

            return res.status(201).json({
                code: 201,
                success: true,
                message: message.book.delete,
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

    async get(req: Request, res: Response) {
        try {
            const result = await this.service.getById(req.params.id);
            if (!result) {
                return res.status(404).json({ message: message.book.Book_not_found });
            }
            return res.status(201).json({
                code: 201,
                success: true,
                message: message.book.book_list,
                data: result || {}
            });
        } catch (error: any) {
            return res.status(400).json({
                code: 400,
                success: false,
                message: error.message
            })
        }
    }

    async list(req: Request, res: Response) {
        try {
            const result = await this.service.list(req.query);
            return res.status(201).json({
                code: 201,
                success: true,
                message: message.book.book_list,
                data: result || {}
            })

        } catch (error: any) {
            return res.status(400).json({
                code: 400,
                success: false,
                message: error.message
            });
        }
    }
}
