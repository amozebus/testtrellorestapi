import { Injectable, NotFoundException } from '@nestjs/common';
import { Comment } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  async create(text: string, cardId: number): Promise<Comment> {
    return this.prisma.comment.create({
      data: { text: text, cardId: cardId },
    });
  }

  async getAll(cardId: number): Promise<Comment[]> {
    return this.prisma.comment.findMany({ where: { cardId: cardId } });
  }

  async getById(id: number, cardId: number): Promise<Comment> {
    const comment = await this.prisma.comment.findFirst({
      where: { id: id, cardId: cardId },
    });
    if (!comment)
      throw new NotFoundException(
        `Comment with id: ${id} for card with id: ${cardId} not found`,
      );
    return comment;
  }

  async update(text: string, id: number, cardId: number): Promise<Comment> {
    const comment = await this.prisma.comment.findFirst({
      where: { id: id, cardId: cardId },
    });
    if (!comment)
      throw new NotFoundException(
        `Comment with id: ${id} for card with id: ${cardId} not found`,
      );
    return this.prisma.comment.update({
      where: { id: id, cardId: cardId },
      data: { text: text, cardId: cardId },
    });
  }

  async delete(id: number, cardId: number): Promise<Comment> {
    const comment = await this.prisma.comment.findFirst({
      where: { id: id, cardId: cardId },
    });
    if (!comment)
      throw new NotFoundException(
        `Comment with id: ${id} for card with id: ${cardId} not found`,
      );
    return this.prisma.comment.delete({
      where: { id: id, cardId: cardId },
    });
  }
}
