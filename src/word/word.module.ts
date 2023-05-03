import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WordService } from './word.service';
import { WordController } from './word.controller';
import { WordEntity } from 'src/database/entities';

@Module({
  imports: [TypeOrmModule.forFeature([WordEntity])],
  controllers: [WordController],
  providers: [WordService],
})
export class WordModule {}
