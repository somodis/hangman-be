import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { WordService } from './word.service';
import { DifficultyLevel, WordDto } from './dto/word.dto';

@Controller('words')
export class WordController {
  constructor(private readonly wordService: WordService) {}

  @Post()
  create(@Body() createWordDto: WordDto) {
    return this.wordService.create(createWordDto);
  }

  @Get()
  findAll() {
    return this.wordService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wordService.findOne(+id);
  }

  @Get('/random/:level')
  findRandomByLevel(@Param('level') level: DifficultyLevel) {
    // todo: userId
    return this.wordService.findRandomByLevel(level, 1);
  }
}
