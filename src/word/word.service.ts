import { Injectable } from '@nestjs/common';
import { WordDto } from './dto/word.dto';

@Injectable()
export class WordService {
  async create(createWordDto: WordDto) {
    return 'This action adds a new word';
  }

  async findAll() {
    return `This action returns all word`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} word`;
  }

  async update(id: number, updateWordDto: WordDto) {
    return `This action updates a #${id} word`;
  }

  async remove(id: number) {
    return `This action removes a #${id} word`;
  }
}
