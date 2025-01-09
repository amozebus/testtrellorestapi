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
import { ColumnsService } from './columns.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Column } from '@prisma/client';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CreateColumnDto } from './dto/create-column.dto';
import { EntitiesGuard } from 'src/auth/guards/entities.guard';
import { UpdateColumnDto } from './dto/update-column.dto';

@ApiTags('Columns')
@Controller('users/:userId/columns')
export class ColumnsController {
  constructor(private service: ColumnsService) {}

  @ApiOperation({
    summary: 'Create a column',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard, EntitiesGuard)
  @Post()
  async createColumn(
    @Body() { title }: CreateColumnDto,
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<Column> {
    return await this.service.create(title, userId);
  }

  @ApiOperation({
    summary: 'Get all user columns with user ID',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard, EntitiesGuard)
  @Get()
  async getUserColumns(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<Column[]> {
    return await this.service.getAll(userId);
  }

  @ApiOperation({
    summary: 'Get user column with ID and user ID',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard, EntitiesGuard)
  @Get(':id')
  async getColumnById(
    @Param('id', ParseIntPipe) id: number,
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<Column> {
    return this.service.getById(id, userId);
  }

  @ApiOperation({
    summary: 'Update user column with ID and user ID',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard, EntitiesGuard)
  @Patch(':id')
  async updateColumn(
    @Body() { title }: UpdateColumnDto,
    @Param('id', ParseIntPipe) id: number,
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<Column> {
    return this.service.update(title, id, userId);
  }

  @ApiOperation({
    summary: 'Delete user column with id and user ID',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard, EntitiesGuard)
  @Delete(':id')
  async deleteColumn(
    @Param('id', ParseIntPipe) id: number,
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<Column> {
    return this.service.delete(id, userId);
  }
}
