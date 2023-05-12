import { DifficultyLevel, Levels } from 'src/word/dto/word.dto';

export const getDifficultyByLength = (wordLength: number): DifficultyLevel => {
  for (let i = 0; i < Levels.length; i++) {
    const level = Levels[i];
    if (wordLength >= level.minLength && wordLength <= level.maxLength) {
      return level.difficulty;
    }
  }
};
