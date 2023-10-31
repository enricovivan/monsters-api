import { Injectable } from '@nestjs/common';
import { Prisma, Users } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDTO } from './dtos/create-user.dto';

import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
    constructor(private prisma:PrismaService){}

    // Encontra apenas um usuário com base no id
    async user(userWhereUniqueInput: Prisma.UsersWhereUniqueInput): Promise<Users | null>{
        return this.prisma.users.findUnique({
            where: userWhereUniqueInput
        })
    }

    // Encontra todos os usuários
    async users(params:{
        skip?: number;
        take?: number;
        cursor?: Prisma.UsersWhereUniqueInput;
        where?: Prisma.UsersWhereInput;
        orderBy?: Prisma.UsersOrderByWithRelationInput;
    }): Promise<Users[]>{

        const {skip, take, cursor, where, orderBy} = params;

        return this.prisma.users.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy
        })
    }

    // encontra um usuario pelo username
    async userByUsername(username: string): Promise<Users> {

        return await this.prisma.users.findUnique({
            where: {
                username
            }
        })

    }

    // Cria um usuário
    async createUser(data: CreateUserDTO): Promise<Users>{

        const user = {
            ...data,
            password: await bcrypt.hash(data.password, 10)
        }

        const userCreation = await this.prisma.users.create({data: user})

        return {
            ...userCreation,
            password: undefined
        }
    }

    // atualiza um usuário
    async updateUser(params: {
        where: Prisma.UsersWhereUniqueInput;
        data: Prisma.UsersUpdateInput
    }): Promise<Users>{
        const {where, data} = params

        return this.prisma.users.update({where, data})
    }

    // deleta o usuário
    async deleteUser(where: Prisma.UsersWhereUniqueInput): Promise<Users>{
        return this.prisma.users.delete({where})
    }

}
