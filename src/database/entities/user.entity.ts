import { ApiHideProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { GameEntity } from './game.entity';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  username: string;

  @Column({
    type: 'varchar',
    nullable: false,
    select: false,
  })
  @ApiHideProperty()
  password: string;

  @ManyToOne(() => GameEntity, (game) => game.user)
  game: GameEntity;

  @Column({
    type: 'int',
    nullable: false,
    default: 0,
  })
  score: number;

  @Column({
    type: 'tinyint',
    default: 0,
  })
  isInGame: boolean;
}
