import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class WordDto {
  @ApiProperty()
  @IsString()
  @MaxLength(255)
  word: string;
}
