import { IsBoolean, IsString, MinLength } from "class-validator";
import { User } from "../entities/user.entity";


export class CreateUserDTO extends User {

    @IsString()
    username: string;

    @IsString()
    @MinLength(4)
    password: string;

    @IsBoolean()
    admin: boolean;

}