import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { databaseConfig } from './datasource.config';
import { UsersModule } from './users/users.module';
import { GameModule } from './game/game.module';
import { WordModule } from './word/word.module';
import { AuthModule } from './auth/auth.module';

import { validate } from './config/validation';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validate,
    }),
    UsersModule,
    GameModule,
    WordModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
