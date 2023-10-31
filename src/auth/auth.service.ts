import { Injectable } from '@nestjs/common';

import { LoginUserDTO } from 'src/user/dtos/login-user.dto';

@Injectable()
export class AuthService {
    
    validateUser(username: string, password: string) {
        throw new Error("Method not implemented.");
    }

    // login
    async login(data: LoginUserDTO) {

       return data;

    }


}
