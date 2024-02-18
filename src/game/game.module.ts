import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameEntity, UserEntity, WordEntity } from 'src/database/entities';
import { GameService } from './game.service';
import { GameController } from './game.controller';

@Module({
  imports: [TypeOrmModule.forFeature([GameEntity, UserEntity, WordEntity])],
  controllers: [GameController],
  providers: [GameService],
})
export class GameModule {}
