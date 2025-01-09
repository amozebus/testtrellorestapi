import { Controller, Post, Body } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { Token } from './entities/token.entity';

@ApiTags('Auth')
@Controller('login')
export class AuthController {
  constructor(private service: AuthService) {}

  @ApiOperation({
    summary: 'Login with email and password',
  })
  @Post('')
  @ApiOkResponse({ type: Token })
  async login(@Body() { email, password }: LoginDto) {
    return this.service.getAccessToken(email, password);
  }
}
