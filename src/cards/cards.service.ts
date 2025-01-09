import { Injectable, NotFoundException } from '@nestjs/common';
import { Card } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CardsService {
  constructor(private prisma: PrismaService) {}

  async create(text: string, columnId: number): Promise<Card> {
    return this.prisma.card.create({
      data: { text: text, columnId: columnId },
    });
  }

  async getAll(columnId: number): Promise<Card[]> {
    return this.prisma.card.findMany({ where: { columnId: columnId } });
  }

  async getById(id: number, columnId: number): Promise<Card> {
    const card = await this.prisma.card.findFirst({
      where: { id: id, columnId: columnId },
    });
    if (!card)
      throw new NotFoundException(
        `Card with id: ${id} for column with id: ${columnId} not found`,
      );
    return card;
  }

  async update(text: string, id: number, columnId: number): Promise<Card> {
    const card = await this.prisma.card.findFirst({
      where: { id: id, columnId: columnId },
    });
    if (!card)
      throw new NotFoundException(
        `Card with id: ${id} for column with id: ${columnId} not found`,
      );
    return this.prisma.card.update({
      where: { id: id, columnId: columnId },
      data: { text: text, columnId: columnId },
    });
  }

  async delete(id: number, columnId: number): Promise<Card> {
    const card = await this.prisma.card.findFirst({
      where: { id: id, columnId: columnId },
    });
    if (!card)
      throw new NotFoundException(
        `Card with id: ${id} for column with id: ${columnId} not found`,
      );
    return this.prisma.card.delete({
      where: { id: id, columnId: columnId },
    });
  }
}
