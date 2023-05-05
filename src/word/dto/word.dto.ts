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

export const LevelLengths = {
  easy: {
    minLength: 6,
    maxLength: 8,
  },
  medium: {
    minLength: 9,
    maxLength: 11,
  },
  hard: {
    minLength: 12,
    maxLength: 14,
  },
};
