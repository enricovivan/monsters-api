import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Monsters } from '@prisma/client'

@Injectable()
export class MonsterService {

  constructor(private prisma: PrismaService) { }

  // Encontra 1 monstro
  async monster(monsterWhereUniqueInput: Prisma.MonstersWhereUniqueInput): Promise<Monsters | null> {
    return this.prisma.monsters.findUnique({
      where: monsterWhereUniqueInput
    })
  }

  // encontrar todos os monstros
  async monsters(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.MonstersWhereUniqueInput;
    where?: Prisma.MonstersWhereInput;
    orderBy?: Prisma.MonstersOrderByWithRelationInput;
  }): Promise<Monsters[]> {
    const { skip, take, cursor, where, orderBy } = params
    return this.prisma.monsters.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy
    })
  }

  // create monster
  async createMonster(data: Prisma.MonstersCreateInput): Promise<Monsters> {
    return this.prisma.monsters.create({
      data
    })
  }

  // update monster
  async updateMonster(params: { where: Prisma.MonstersWhereUniqueInput, data: Prisma.MonstersUpdateInput }): Promise<Monsters> {

    const { where, data } = params

    return this.prisma.monsters.update({
      where,
      data
    })
  }

  // delete monster
  async deleteMonster(id: Prisma.MonstersWhereUniqueInput): Promise<Monsters> {
    return this.prisma.monsters.delete({
      where: id
    })
  }

  // get monster by user
  async getMonsterByUser(userID: Prisma.UsersWhereUniqueInput): Promise<Monsters[]> {
    return this.prisma.monsters.findMany({
      where: {
        authorId: userID.id
      }
    })
  }

}
