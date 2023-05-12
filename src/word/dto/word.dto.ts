import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class WordDto {
  @ApiProperty()
  @IsString()
  @MaxLength(255)
  word: string;
}

export enum DifficultyLevel {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
}

export const Levels = [
  {
    minLength: 6,
    maxLength: 8,
    difficulty: DifficultyLevel.EASY,
  },
  {
    minLength: 9,
    maxLength: 11,
    difficulty: DifficultyLevel.MEDIUM,
  },
  {
    minLength: 12,
    maxLength: 14,
    difficulty: DifficultyLevel.HARD,
  },
];
