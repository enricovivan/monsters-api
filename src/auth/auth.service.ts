import { Injectable, UnauthorizedException } from '@nestjs/common';

import { LoginUserDTO } from 'src/user/dtos/login-user.dto';
import { UserService } from 'src/user/user.service';

import * as bcrypt from 'bcrypt'
import { User } from 'src/user/entities/user.entity';
import { UserPayload } from './models/UserPayload';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from './models/UserToken';

@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private jwtService: JwtService
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

        throw new Error('Username or password incorrect!')

    }

    async login(user: User): Promise<UserToken> {
        // recebe user, transforma em jwt

        const payload: UserPayload = {
            sub: user.id,
            username: user.username,
            admin: user.admin
        }

        const jwtToken = await this.jwtService.signAsync(payload);

        return {
            access_token: jwtToken
        }

    }

}
