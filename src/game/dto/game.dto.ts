import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

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
  // @IsArray()
  // @IsString()
  guessedLetters?: string[];
}
