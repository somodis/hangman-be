import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WordService } from './word.service';
import { WordController } from './word.controller';
import { GameEntity, WordEntity } from 'src/database/entities';

@Module({
  imports: [TypeOrmModule.forFeature([WordEntity, GameEntity])],
  controllers: [WordController],
  providers: [WordService],
})
export class WordModule {}
