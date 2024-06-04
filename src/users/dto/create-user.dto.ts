import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator"

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    //email: string
    @IsEmail()
    email: string;

    @IsEnum(['INTERN', 'ADMIN', 'STUDENT'], {
        message: 'role must be one of: INTERN, ADMIN, STUDENT'
    })
    role: 'INTERN' | 'ADMIN' | 'STUDENT';
}

/*
    DTO - Data Transfer Object
    We use as schemas and we can also use with them pipes to validate he incoming request data.
    Pipes are a special type of  middleware.
*/