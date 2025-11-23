
import { Schema, model, Document, Types } from 'mongoose';


export interface IBorrow extends Document {
    user: Types.ObjectId;
    book: Types.ObjectId;
    borrowedAt: Date;
    returnedAt?: Date | null;
}


const BorrowSchema = new Schema<IBorrow>({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    book: {
        type: Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    borrowedAt: {
        type:
            Date, default: () => new Date()
    },
    returnedAt: {
        type: Date,
        default: null
    }
});


export const BorrowModel = model<IBorrow>('Borrow', BorrowSchema);