import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EntitiesGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    if (Number(request.params.userId) !== request.user.sub)
      throw new ForbiddenException('Wrong user');

    if (request.params.columnId) {
      const column = await this.prisma.column.findFirst({
        where: { id: Number(request.params.columnId) },
      });
      if (column.userId !== request.user.sub)
        throw new ForbiddenException('Wrong user');
    }
    return true;
  }
}
