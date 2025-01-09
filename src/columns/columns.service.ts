import { Injectable, NotFoundException } from '@nestjs/common';
import { Column } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ColumnsService {
  constructor(private prisma: PrismaService) {}

  async create(title: string, userId: number): Promise<Column> {
    return this.prisma.column.create({
      data: { title: title, userId: userId },
    });
  }

  async getAll(userId: number): Promise<Column[]> {
    return this.prisma.column.findMany({ where: { userId: userId } });
  }

  async getById(id: number, userId: number): Promise<Column> {
    const column = await this.prisma.column.findFirst({
      where: { userId: userId, id: id },
    });
    if (!column)
      throw new NotFoundException(
        `Column with id: ${id} for user with id: ${userId} not found`,
      );
    return column;
  }

  async update(title: string, id: number, userId: number): Promise<Column> {
    const column = await this.prisma.column.findFirst({
      where: { userId: userId, id: id },
    });
    if (!column)
      throw new NotFoundException(
        `Column with id: ${id} for user with id: ${userId} not found`,
      );
    return this.prisma.column.update({
      where: { id: id, userId: userId },
      data: { title: title, userId: userId },
    });
  }

  async delete(id: number, userId: number): Promise<Column> {
    const column = await this.prisma.column.findFirst({
      where: { id: id, userId: userId },
    });
    if (!column)
      throw new NotFoundException(
        `Column with id: ${id} for user with id: ${userId} not found`,
      );
    return this.prisma.column.delete({
      where: { id: id, userId: userId },
    });
  }
}
