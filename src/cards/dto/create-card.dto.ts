import { ApiProperty } from '@nestjs/swagger';

export class CreateCardDto {
  @ApiProperty()
  text: string;
}
