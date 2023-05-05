import { ApiHideProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { GameEntity } from './game.entity';
import { Role } from 'src/common/role-enum';

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
