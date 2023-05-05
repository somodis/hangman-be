import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTables1683188944176 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            isNullable: false,
            generationStrategy: 'increment',
          },
          {
            name: 'username',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'password',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'role',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'score',
            type: 'int',
            isNullable: false,
            default: 0,
          },
          {
            name: 'isInGame',
            type: 'tinyint',
            isNullable: false,
            default: 0,
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'word',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            isNullable: false,
            generationStrategy: 'increment',
          },
          {
            name: 'word',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'word_length',
            type: 'int',
            isNullable: false,
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'game',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            isNullable: false,
            generationStrategy: 'increment',
          },
          {
            name: 'user_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'word_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'guessed_letters',
            type: 'varchar',
            isNullable: true,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'game',
      new TableForeignKey({
        name: 'FK_user_game',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'game',
      new TableForeignKey({
        name: 'FK_word_game',
        columnNames: ['word_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'word',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('game', true, true);
    await queryRunner.dropTable('user', true, true);
    await queryRunner.dropTable('word', true, true);
  }
}
