import { IsArray, IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class GameDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsNumber()
  wordId: number;

  @IsNumber()
  userId: number;

  @IsOptional()
  @IsArray()
  @IsString()
  guessedLetters?: string[];

  @IsBoolean()
  isInProgress: boolean;

  @IsNumber()
  mistakes: number;
}
