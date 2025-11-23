
import { Schema, model, Document } from 'mongoose';


export interface IBook extends Document {
    title: string;
    author: string;
    isbn: string;
    publicationDate?: Date;
    genre?: string;
    totalCopies: number;
    availableCopies: number;
    createdAt: Date,
    updatedAt: Date
}


const BookSchema = new Schema<IBook>({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    isbn: {
        type: String,
        required: true,
        unique: true
    },
    publicationDate: Date,
    genre: String,
    totalCopies: {
        type: Number,
        default: 1
    },
    availableCopies: {
        type: Number,
        default: 1
    },
    createdAt: {
        type: Date, default: () => new Date()
    },
    updatedAt: {
        type: Date, default: () => new Date()
    }
});


export const BookModel = model<IBook>('Book', BookSchema);