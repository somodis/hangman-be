import { ApiHideProperty } from '@nestjs/swagger';
import { Column, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from 'src/common/role-enum';
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

  @Column({ name: 'role', type: 'varchar', nullable: true })
  role: Role;

  @OneToMany(() => GameEntity, (game: GameEntity) => game.user)
  @JoinTable({
    name: 'game',
    joinColumns: [{ name: 'user_id' }],
    inverseJoinColumns: [{ name: 'word_id' }],
  })
  games: GameEntity[];

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
