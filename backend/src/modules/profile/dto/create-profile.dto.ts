import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateProfileDto {
  @ApiProperty({ example: 'Ivan' })
  @IsNotEmpty()
  @IsString()
  readonly firstName: string;

  @ApiProperty({ example: 'Popov' })
  @IsNotEmpty()
  @IsString()
  readonly lastName: string;

  @ApiProperty({ example: 'test@example.com' })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  readonly email: string;

  @ApiProperty({ type: 'file' })
  readonly photo: string;
}
