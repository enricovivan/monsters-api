import { Injectable } from '@nestjs/common';
import { Prisma, Users } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

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

    // Cria um usuário
    async createUser(data: Prisma.UsersCreateInput): Promise<Users>{
        return this.prisma.users.create({data})
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

    // verifica se o usuario existe e retorna um boolean
    async verifyUser(data: Prisma.UsersWhereUniqueInput): Promise<boolean> {
        
        const {username, password} = data

        let user = this.prisma.users.findUnique({where: {
            username: data.username,
            password: data.password,
            id: data.id
        }})

        if (user) {
            return true;
        }
        
        return false;

    }
}
