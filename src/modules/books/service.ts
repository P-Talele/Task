import { BookModel } from './../../models/Book';

export class BookService {
    private bookModel: typeof BookModel;

    constructor() {
        this.bookModel = BookModel;
    }

    async create(payload: any) {
        const book = await this.bookModel.create({
            title: payload.title,
            author: payload.author,
            isbn: payload.isbn,
            publicationDate: payload.publicationDate ? new Date(payload.publicationDate) : undefined,
            genre: payload.genre,
            totalCopies: payload.totalCopies,
            availableCopies: payload.totalCopies
        });

        return book;
    }

    async update(id: string, payload: any) {
        const update: any = { ...payload };

        if (payload.publicationDate) {
            update.publicationDate = new Date(payload.publicationDate);
        }

        if (payload.totalCopies !== undefined) {
            const book = await this.bookModel.findById(id);

            if (book) {
                const diff = payload.totalCopies - book.totalCopies;
                update.availableCopies = Math.max(
                    0,
                    (book.availableCopies || 0) + diff
                );
            }
        }

        return this.bookModel.findByIdAndUpdate(id, update, { new: true });
    }

    async delete(id: string) {
        return this.bookModel.findByIdAndDelete(id);
    }

    async getById(id: string) {
        return this.bookModel.findById(id);
    }

    async list(query: any) {
        const page = Number(query.page || 1);
        const limit = Number(query.limit || 10);
        const skip = (page - 1) * limit;
        const Genere = query.genre;
        const Author = query.author
        const Title = query.title

        const filter: any = {};

        if (Genere) filter.genre = Genere
        if (Author) filter.author = { $regex: Author, $options: 'i' };
        if (Title) filter.title = { $regex: Title, $options: 'i' };

        const [items, total] = await Promise.all([
            this.bookModel.find(filter).skip(skip).limit(limit),
            this.bookModel.countDocuments(filter)
        ]);

        return { items, total };
    }
}
