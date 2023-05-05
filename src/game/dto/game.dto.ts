import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional } from 'class-validator';

export class GameDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @ApiProperty()
  @IsNumber()
  wordId: number;

  @ApiProperty()
  @IsNumber()
  userId: number;

  @IsOptional()
  @ApiProperty()
  @IsArray()
  guessedLetters?: string[];
}
