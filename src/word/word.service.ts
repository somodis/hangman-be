import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DifficultyLevel, WordDto } from './dto/word.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { WordEntity } from 'src/database/entities';
import { Repository } from 'typeorm';

@Injectable()
export class WordService {
  constructor(
    @InjectRepository(WordEntity)
    private readonly wordRepository: Repository<WordEntity>,
  ) {}

  async create(data: WordDto) {
    const word = await this.findOneByWord(data.word);

    if (word) {
      throw new BadRequestException('WORD_ALREADY_EXISTS');
    }

    return await this.wordRepository.save({...data, wordLength: data.word.length });
  }

  async findAll() {
    return this.wordRepository.find();
  }

  async findOne(id: number) {
    const word = await this.wordRepository.findOneBy({ id });
    if (!word) {
      throw new NotFoundException();
    }
    return word;
  }

  async findOneByWord(word: string) {
    return this.wordRepository.findOneBy({ word });
  }

  async findRandomByLevel(level: DifficultyLevel) {
    // qb filter based on level, 
    // dump used words (game log / view)
    return `random unique word by level ${level}`;
  }
}
