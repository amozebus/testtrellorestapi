import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule],
  controllers: [CardsController],
  providers: [CardsService, JwtService],
})
export class CardsModule {}
