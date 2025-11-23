import { IsOptional, IsString, IsNumber, Min } from 'class-validator';

export class UpdateBookDTO {
  @IsOptional()
  @IsString({ message: 'Title must be a string' })
  title?: string;

  @IsOptional()
  @IsString({ message: 'Author must be a string' })
  author?: string;

  @IsOptional()
  @IsString({ message: 'ISBN must be a string' })
  isbn?: string;

  @IsOptional()
  @IsString({ message: 'Publication date must be a string' })
  publicationDate?: string;

  @IsOptional()
  @IsString({ message: 'Genre must be a string' })
  genre?: string;

  @IsOptional()
  @IsNumber({}, { message: 'Total copies must be a number' })
  @Min(0, { message: 'Total copies must be at least 0' })
  totalCopies?: number;
}
