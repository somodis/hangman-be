import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './datasource.config';
import { UsersModule } from './users/users.module';
import { GameModule } from './game/game.module';
import { WordModule } from './word/word.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    UsersModule,
    GameModule,
    WordModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
