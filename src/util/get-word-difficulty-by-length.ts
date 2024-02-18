import { DifficultyLevel, Levels } from 'src/word/dto/word.dto';

export const getDifficultyByLength = (wordLength: number): DifficultyLevel | null => {
  for (const level of Levels) {
    const { minLength, maxLength, difficulty } = level;
    if (wordLength >= minLength && wordLength <= maxLength) {
      return difficulty;
    }
  }
  return null;
};
