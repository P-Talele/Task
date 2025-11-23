import mongoose from "mongoose";
import { BorrowModel } from "./../../models/Borrow";
import { BookModel } from "../../models/Book";
import { message } from "../../helper/messages";

export class BorrowService {
    private borrowModel: typeof BorrowModel;
    private bookModel: typeof BookModel;

    constructor() {
        this.borrowModel = BorrowModel;
        this.bookModel = BookModel;
    }

    async borrow(userId: string, bookId: string) {
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            const book = await this.bookModel.findById(bookId).session(session);
            if (!book) throw { status: 404, message: message.barrow.Book_not_found };
            if (book.availableCopies <= 0) throw { status: 400, message: message.barrow.No_copies_available };

            book.availableCopies -= 1;
            await book.save({ session });

            const record = await this.borrowModel.create(
                [{ user: userId, book: bookId }],
                { session }
            );

            await session.commitTransaction();
            session.endSession();

            return record[0];
        } catch (err) {
            await session.abortTransaction();
            session.endSession();
            throw err;
        }
    }

    async returnBook(userId: string, bookId: string) {
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            const borrow = await this.borrowModel
                .findOne({ user: userId, book: bookId, returnedAt: null })
                .session(session);

            if (!borrow) throw { status: 404, message: message.barrow.Borrow_record_not_found };

            borrow.returnedAt = new Date();
            await borrow.save({ session });

            const book = await this.bookModel.findById(bookId).session(session);
            if (book) {
                book.availableCopies += 1;
                await book.save({ session });
            }

            await session.commitTransaction();
            session.endSession();

            return borrow;
        } catch (err) {
            await session.abortTransaction();
            session.endSession();
            throw err;
        }
    }

    async history(userId: string) {
        return this.borrowModel
            .find({ user: userId })
            .populate("book")
            .sort({ borrowedAt: -1 });
    }
}
