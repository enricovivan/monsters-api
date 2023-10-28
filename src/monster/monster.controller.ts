import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { MonsterService } from './monster.service';
import { Monsters as MonsterModel } from '@prisma/client'

@Controller('monster')
export class MonsterController {
  constructor(private readonly monsterService: MonsterService) {}

  // ver todos os monstros
  @Get('all')
  async getAllMonster(): Promise<MonsterModel[]> {
    return this.monsterService.monsters({})
  }

  // get one monster
  @Get(':id')
  async getOneMonster(@Param('id') id: string): Promise<MonsterModel> {
    return this.monsterService.monster({id: Number(id)})
  }
  
  // get monster by user id
  @Get('user/:user_id')
  async getMonsterByUserId(@Param('user_id') userId: string): Promise<MonsterModel[]>{
    return this.monsterService.getMonsterByUser({
      id: Number(userId)
    })
  }

  // create a monster
  @Post('add')
  async createMonster(@Body() data: {name:string, description:string, authorId:number}): Promise<MonsterModel> {

    const {name, description, authorId} = data

    return this.monsterService.createMonster({
      name,
      description,
      author: {
        connect: {
          id: Number(authorId)
        }
      }
    })
  }

  // update a monster
  @Put('update/:id')
  async updateMonster(@Param('id') id: string, @Body() data: { name:string, description: string }): Promise<MonsterModel> {

    return this.monsterService.updateMonster({
      where: {
        id: Number(id)
      },
      data
    });

  }

  // delete a monster
  @Delete('delete/:id')
  async deleteMonster(@Param('id') id: string): Promise<MonsterModel> {
    return this.monsterService.deleteMonster({id: Number(id)})
  }

}
