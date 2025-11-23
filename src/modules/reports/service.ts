import { BorrowModel } from '../../models/Borrow';
import { BookModel } from '../../models/Book';

export class ReportService {
    private borrowModel: typeof BorrowModel;
    private bookModel: typeof BookModel;

    constructor() {
        this.borrowModel = BorrowModel;
        this.bookModel = BookModel;
    }

    async mostBorrowed(limit = 10) {
        return this.borrowModel.aggregate([
            { $group: { _id: '$book', count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: limit },
            {
                $lookup: {
                    from: 'books',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'book'
                }
            },
            { $unwind: '$book' },
            {
                $project: {
                    _id: 0,
                    bookId: '$book._id',
                    title: '$book.title',
                    author: '$book.author',
                    count: 1
                }
            }
        ]);
    }

    async activeMembers(limit = 10) {
        return this.borrowModel.aggregate([
            { $group: { _id: '$user', borrows: { $sum: 1 } } },
            { $sort: { borrows: -1 } },
            { $limit: limit },
            {
                $lookup: {
                    from: 'users',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            { $unwind: '$user' },
            {
                $project: {
                    _id: 0,
                    userId: '$user._id',
                    name: '$user.name',
                    email: '$user.email',
                    borrows: 1
                }
            }
        ]);
    }

    async availabilitySummary() {
        return this.bookModel.aggregate([
            {
                $group: {
                    _id: null,
                    totalBooks: { $sum: '$totalCopies' },
                    availableBooks: { $sum: '$availableCopies' }
                }
            },
            {
                $project: {
                    _id: 0,
                    totalBooks: 1,
                    availableBooks: 1,
                    borrowedBooks: { $subtract: ['$totalBooks', '$availableBooks'] }
                }
            }
        ]);
    }
}
