import { DifficultyLevel } from 'src/word/dto/word.dto';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'word' })
export class WordEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  word: string;

  @Column({
    name: 'word_length',
    type: 'int',
    nullable: false,
  })
  wordLength: number;

  @Column({
    type: 'enum',
    enum: DifficultyLevel,
    nullable: false,
  })
  difficulty: DifficultyLevel;
}
