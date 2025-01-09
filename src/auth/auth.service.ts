import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { Token } from './entities/token.entity';

import * as bcrypt from 'bcrypt';
import { AuthConfig } from 'src/config/auth.configuration';


@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: AuthConfig
  ) {}

  async getAccessToken(email: string, password: string): Promise<Token> {
    const user = await this.prisma.user.findUnique({
      where: { email: email },
    });

    if (await bcrypt.compare(password, user.password_hash))
      return new Token(await this.jwt.signAsync({ sub: user.id }, { secret: this.config.secret }));
    else throw new UnauthorizedException('Invalid credentials');
  }
}
