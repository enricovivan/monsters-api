import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { Users as UserModel } from '@prisma/client'
import { CreateUserDTO } from './dtos/create-user.dto';

import * as bcrypt from 'bcrypt'

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService){}

    @Get('/all')
    async getAllUsers (): Promise<UserModel[]> {
        return this.userService.users({orderBy: {id: 'asc'}});
    }

    @Get(':id')
    async getOneUser (@Param('id') id: string): Promise<UserModel> {
        return this.userService.user({id: Number(id)})
    }

    // verifica se usuario existe no banco
    @Post('verify')
    @HttpCode(HttpStatus.OK)
    async verifyUser (@Body() userData: {username: string, password: string}): Promise<boolean> {

        const {username, password} = userData

        let usernameUser = await this.userService.userByUsername(username);

        return await bcrypt.compare(password, usernameUser.password);

    }

    @Post('add')
    async createUser(@Body() userData: CreateUserDTO): Promise<UserModel> {
        return this.userService.createUser(userData)
    }

    @Put('update/:id')
    async updateUser(@Param('id') id: string, @Body() data: {username, password, admin}): Promise<UserModel> {
        return this.userService.updateUser({
            where: {id: Number(id)},
            data: data
        })
    }

    @Delete('delete/:id')
    async deleteUser(@Param('id') id: string): Promise<UserModel> {
        return this.userService.deleteUser({
            id: Number(id)
        })
    }



}
