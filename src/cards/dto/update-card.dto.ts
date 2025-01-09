import { ApiProperty } from '@nestjs/swagger';

export class UpdateCardDto {
  @ApiProperty()
  text: string;
}
