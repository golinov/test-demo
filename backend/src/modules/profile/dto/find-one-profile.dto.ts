import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class FindOneProfileDto {
  @ApiProperty({ example: '1' })
  @IsNotEmpty()
  @IsString()
  readonly profileId: string;
}
