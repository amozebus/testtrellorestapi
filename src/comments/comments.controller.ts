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
import { CommentsService } from './comments.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Comment } from '@prisma/client';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { EntitiesGuard } from 'src/auth/guards/entities.guard';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@ApiTags('Comments')
@Controller('users/:userId/columns/:columnId/comments/:cardId/comments')
export class CommentsController {
  constructor(private service: CommentsService) {}

  @ApiOperation({
    summary: 'Create a comment',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard, EntitiesGuard)
  @Post()
  async createComment(
    @Body() { text }: CreateCommentDto,
    @Param('cardId', ParseIntPipe) cardId: number,
    @Param('columnId', ParseIntPipe) columnId: number,
    @Param('userId', ParseIntPipe) userId: number
  ): Promise<Comment> {
    return await this.service.create(text, cardId);
  }

  @ApiOperation({
    summary: 'Get all card comments with card ID',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard, EntitiesGuard)
  @Get()
  async getCardComments(
    @Param('cardId', ParseIntPipe) cardId: number,
    @Param('columnId', ParseIntPipe) columnId: number,
    @Param('userId', ParseIntPipe) userId: number
  ): Promise<Comment[]> {
    return await this.service.getAll(cardId);
  }

  @ApiOperation({
    summary: 'Get comment from card with ID and card ID',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard, EntitiesGuard)
  @Get(':id')
  async getCommentById(
    @Param('id', ParseIntPipe) id: number,
    @Param('cardId', ParseIntPipe) cardId: number,
    @Param('columnId', ParseIntPipe) columnId: number,
    @Param('userId', ParseIntPipe) userId: number
  ): Promise<Comment> {
    return this.service.getById(id, cardId);
  }

  @ApiOperation({
    summary: 'Update card comment with ID and card ID',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard, EntitiesGuard)
  @Patch(':id')
  async updateComment(
    @Body() { text }: UpdateCommentDto,
    @Param('id', ParseIntPipe) id: number,
    @Param('cardId', ParseIntPipe) cardId: number,
    @Param('columnId', ParseIntPipe) columnId: number,
    @Param('userId', ParseIntPipe) userId: number
  ): Promise<Comment> {
    return this.service.update(text, id, cardId);
  }

  @ApiOperation({
    summary: 'Delete card comment with ID and card ID',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard, EntitiesGuard)
  @Delete(':id')
  async deleteCardComment(
    @Param('id', ParseIntPipe) id: number,
    @Param('cardId', ParseIntPipe) cardId: number,
    @Param('columnId', ParseIntPipe) columnId: number,
    @Param('userId', ParseIntPipe) userId: number
  ): Promise<Comment> {
    return this.service.delete(id, cardId);
  }
}
