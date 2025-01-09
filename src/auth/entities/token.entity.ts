import { ApiProperty } from '@nestjs/swagger';

export class Token {
  @ApiProperty()
  access_token: string;

  @ApiProperty()
  token_type: string;

  constructor(access_token: string) {
    this.access_token = access_token;
    this.token_type = 'bearer';
  }
}
