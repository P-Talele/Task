import { IsEmail, MinLength, IsString, IsNotEmpty, MaxLength, IsIn } from 'class-validator';
import { Role } from '../../../config';

export class RegisterDTO {
    @IsNotEmpty({ message: 'Name is required' })
    @IsString({ message: 'Name must be a string' })
    name!: string;


    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({}, { message: 'Please provide a valid email address' })
    email!: string;

    @IsNotEmpty({ message: 'Password is required' })
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    @MaxLength(15, { message: 'Password must be less than 15 characters.' })
    password!: string;

    @IsNotEmpty({ message: 'Role is required' })
    @IsIn([Role.Admin, Role.Member], { message: 'Role must be either admin or member' })
    role!: Role.Admin | Role.Member;


}
