import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { GameEntity } from './game.entity';

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
}
