import { ApiProperty } from '@nestjs/swagger';

export class UpdateColumnDto {
  @ApiProperty()
  title: string;
}
