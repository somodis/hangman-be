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
}
