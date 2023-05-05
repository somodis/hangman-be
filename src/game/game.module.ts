import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { GameEntity, UserEntity, WordEntity } from 'src/database/entities';

@Module({
  imports: [TypeOrmModule.forFeature([GameEntity, UserEntity, WordEntity])],
  controllers: [GameController],
  providers: [GameService],
})
export class GameModule {}
