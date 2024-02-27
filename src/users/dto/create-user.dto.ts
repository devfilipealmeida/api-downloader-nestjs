/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    id: string;

    @IsString()
    @MaxLength(255)
    @MinLength(3)
    @IsNotEmpty()
    name: string;

    @MaxLength(255)
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;
    
    @IsString()
    @MaxLength(255)
    @MinLength(3)
    @IsNotEmpty()
    username: string;

    @IsString()
    @MaxLength(255)
    @MinLength(4)
    @IsNotEmpty()
    password: string;
}
