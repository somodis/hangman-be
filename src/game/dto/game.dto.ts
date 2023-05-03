import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber } from 'class-validator';

export class GameDto {
  @ApiProperty()
  @IsNumber()
  wordId: number;

  @ApiProperty()
  @IsNumber()
  userId: number;

  @ApiProperty()
  @IsArray()
  guessedLetters: string[];
}
