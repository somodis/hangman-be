import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, RelationId } from 'typeorm';

import { UserEntity } from './user.entity';
import { WordEntity } from './word.entity';

@Entity({ name: 'game' })
export class GameEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id: number;

  @ManyToOne(() => WordEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'word_id' })
  word: WordEntity;

  @RelationId((game: GameEntity) => game.word)
  wordId: number;

  @ManyToOne(() => UserEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @RelationId((game: GameEntity) => game.user)
  userId: number;

  @Column({
    type: 'varchar',
    name: 'guessed_letters',
  })
  guessedLetters: string;

  @Column({
    type: 'tinyint',
    name: 'isInProgress',
  })
  isInProgress: boolean;

  @Column({
    type: 'int',
    name: 'mistakes',
  })
  mistakes: number;
}
