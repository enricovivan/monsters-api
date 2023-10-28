import { Module } from '@nestjs/common';
import { MonsterService } from './monster.service';
import { MonsterController } from './monster.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [MonsterController],
  providers: [MonsterService, PrismaService]
})
export class MonsterModule {}
