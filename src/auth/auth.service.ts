import { Injectable, UnauthorizedException } from '@nestjs/common';

import { LoginUserDTO } from 'src/user/dtos/login-user.dto';
import { UserService } from 'src/user/user.service';

import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {

    constructor(
        private userService: UserService
    ){}

    async validateUser(username: string, password: string) {
        const user = await this.userService.userByUsername(username);

        console.log(username + ' ' + password)

        if (user){
            const isPasswordValid = await bcrypt.compare(password, user.password)

            if (isPasswordValid){
                return {
                    ...user,
                    password: undefined
                }
            }
        }

        console.log(user)

        throw new Error('Username or password incorrect!')

    }

    // login
    async login(data: LoginUserDTO) {

       return data;

    }


}
