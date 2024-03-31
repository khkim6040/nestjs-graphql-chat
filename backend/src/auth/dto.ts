import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";



@InputType()
export class RegisterDto {
    @Field()
    @IsNotEmpty({message: 'Fullname cannot be empty'})
    @IsString({message: 'Fullname must be a string'})
    fullname: string;

    @Field()
    @IsNotEmpty({message: 'Passwaord cannot be empty'})
    @MinLength(8, {message: 'Password must be at least 8 characters'})
    password: string;

    @Field()
    @IsNotEmpty({message: 'Confirm Password is required'})
    confirmPassword: string;

    @Field()
    @IsNotEmpty({message: 'Email cannot be empty'})
    @IsEmail({}, {message: 'Invalid email'})
    email: string;
}


@InputType()
export class LoginDto {
    @Field()
    @IsNotEmpty({message: 'Email cannot be empty'})
    @IsEmail({}, {message: 'Invalid email'})
    email: string;

    @Field()
    @IsNotEmpty({message: 'Password cannot be empty'})
    password: string;
}