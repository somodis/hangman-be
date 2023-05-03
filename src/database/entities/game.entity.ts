import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { WordEntity } from './word.entity';

@Entity({ name: 'game' })
export class GameEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id: number;

  @ManyToOne(() => WordEntity, (word: WordEntity) => word.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'word_id' })
  public wordId: WordEntity;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  public userId: UserEntity;

  @Column({
    type: 'varchar',
  })
  guessedLetters: string[];
}
