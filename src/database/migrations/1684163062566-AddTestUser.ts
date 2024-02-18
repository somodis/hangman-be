import { MigrationInterface, QueryRunner } from 'typeorm';
import { Role } from 'src/common/role-enum';
import { hash } from 'bcrypt';
import { UserEntity } from '../entities';

export class AddTestUser1684163062566 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const testuser = queryRunner.manager.create(UserEntity, {
      username: 'testuser',
      password: await hash('test', 10),
      role: Role.USER,
    });
    await queryRunner.manager.save(testuser);

    const testadmin = queryRunner.manager.create(UserEntity, {
      username: 'testadmin',
      password: await hash('test', 10),
      role: Role.ADMIN,
    });
    await queryRunner.manager.save(testadmin);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.delete(UserEntity, { username: 'testuser' });
    await queryRunner.manager.delete(UserEntity, { username: 'testadmin' });
  }
}
