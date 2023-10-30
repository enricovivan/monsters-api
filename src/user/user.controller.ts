import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { Users as UserModel } from '@prisma/client'

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
    async verifyUser (@Body() userData: {username: string, password: string}): Promise<boolean> {

        const user = this.userService.users({where: {password: userData.password, username: userData.username}})

        if ((await user).length == 0) return false;

        return true

    }

    @Post('add')
    async createUser(@Body() userData: {username:string, password:string, admin: boolean}): Promise<UserModel> {
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
