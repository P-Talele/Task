import { IsString, IsOptional, IsNumber, Min } from 'class-validator';

export class CreateBookDTO {
    @IsString({ message: 'Title must be a string' })
    title!: string;

    @IsString({ message: 'Author must be a string' })
    author!: string;

    @IsString({ message: 'ISBN must be a string' })
    isbn!: string;

    @IsOptional()
    @IsString({ message: 'Publication date must be a string' })
    publicationDate?: string;

    @IsOptional()
    @IsString({ message: 'Genre must be a string' })
    genre?: string;

    @IsNumber({}, { message: 'Total copies must be a number' })
    @Min(1, { message: 'Total copies must be at least 1' })
    totalCopies!: number;
}
