import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { CardsService } from './cards.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Card } from '@prisma/client';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CreateCardDto } from './dto/create-card.dto';
import { EntitiesGuard } from 'src/auth/guards/entities.guard';
import { UpdateCardDto } from './dto/update-card.dto';

@ApiTags('Cards')
@Controller('users/:userId/columns/:columnId/cards')
export class CardsController {
  constructor(private service: CardsService) {}

  @ApiOperation({
    summary: 'Create a card',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard, EntitiesGuard)
  @Post()
  async createCard(
    @Body() { text }: CreateCardDto,
    @Param('columnId', ParseIntPipe) columnId: number,
    @Param('userId', ParseIntPipe) userId: number
  ): Promise<Card> {
    return await this.service.create(text, columnId);
  }

  @ApiOperation({
    summary: 'Get all cards with column ID',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard, EntitiesGuard)
  @Get()
  async getColumnCards(
    @Param('columnId', ParseIntPipe) columnId: number,
    @Param('userId', ParseIntPipe) userId: number
  ): Promise<Card[]> {
    return await this.service.getAll(columnId);
  }

  @ApiOperation({
    summary: 'Get card with ID and column ID',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard, EntitiesGuard)
  @Get(':id')
  async getCardById(
    @Param('id', ParseIntPipe) id: number,
    @Param('columnId', ParseIntPipe) columnId: number,
    @Param('userId', ParseIntPipe) userId: number
  ): Promise<Card> {
    return this.service.getById(id, columnId);
  }

  @ApiOperation({
    summary: 'Update card with ID and column ID',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard, EntitiesGuard)
  @Patch(':id')
  async updateCard(
    @Body() { text }: UpdateCardDto,
    @Param('id', ParseIntPipe) id: number,
    @Param('columnId', ParseIntPipe) columnId: number,
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<Card> {
    return this.service.update(text, id, columnId);
  }

  @ApiOperation({
    summary: 'Delete column card with ID and column ID',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard, EntitiesGuard)
  @Delete(':id')
  async deleteCard(
    @Param('id', ParseIntPipe) id: number,
    @Param('columnId', ParseIntPipe) columnId: number,
    @Param('userId', ParseIntPipe) userId: number
  ): Promise<Card> {
    return this.service.delete(id, columnId);
  }
}
