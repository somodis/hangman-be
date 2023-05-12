import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

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

  @ApiProperty()
  @IsBoolean()
  isInProgress: boolean;

  @ApiProperty()
  @IsNumber()
  mistakes: number;
}
