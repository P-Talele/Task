import { IsEmail, MinLength, MaxLength, IsNotEmpty } from 'class-validator';

export class LoginDTO {
    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({}, { message: 'Enter valid email' })
    email!: string;

    @IsNotEmpty({ message: 'Password is required' })
    @MinLength(6, { message: 'Password must be at least 6 characters.' })
    @MaxLength(15, { message: 'Password must be at less than 15 characters.' })
    password!: string;
}
