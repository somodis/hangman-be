import { MigrationInterface, QueryRunner } from 'typeorm';
import { words } from '../../util/words';
import { WordEntity } from '../entities';

export class FillWordsTable1683196461011 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    Promise.all(
      words.map(async (currentWord) => {
        const newWord = queryRunner.manager.create(WordEntity, {
          word: currentWord,
          wordLength: currentWord.length
        });
        await queryRunner.manager.save(newWord);
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    Promise.all(
      words.map(async (currentWord) => {
        await queryRunner.manager.delete(WordEntity, { word: currentWord });
      }),
    );
  }
}
