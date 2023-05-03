import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WordService } from './word.service';
import { WordDto } from './dto/word.dto';

@Controller('word')
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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWordDto: WordDto) {
    return this.wordService.update(+id, updateWordDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.wordService.remove(+id);
  }
}
