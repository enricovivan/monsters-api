import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './user/user.module';
import { MonsterModule } from './monster/monster.module';

@Module({
  imports: [UserModule, MonsterModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
