import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DifficultyLevel, LevelLengths, WordDto } from './dto/word.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { GameEntity, WordEntity } from 'src/database/entities';
import { Repository } from 'typeorm';

@Injectable()
export class WordService {
  constructor(
    @InjectRepository(WordEntity)
    private readonly wordRepository: Repository<WordEntity>,
    @InjectRepository(GameEntity)
    private readonly gameRepository: Repository<GameEntity>,
  ) {}

  async create(data: WordDto): Promise<WordEntity> {
    const word = await this.findOneByWord(data.word);

    if (word) {
      throw new BadRequestException('WORD_ALREADY_EXISTS');
    }

    return await this.wordRepository.save({
      ...data,
      wordLength: data.word.length,
    });
  }

  async findAll(): Promise<WordEntity[]> {
    return this.wordRepository.find();
  }

  async findOne(id: number): Promise<WordEntity> {
    const word = await this.wordRepository.findOneBy({ id });
    if (!word) {
      throw new NotFoundException();
    }
    return word;
  }

  async findOneByWord(word: string): Promise<WordEntity> {
    return this.wordRepository.findOneBy({ word });
  }

  async findWordsByLength(length: number): Promise<WordEntity[]> {
    return this.wordRepository.find({ where: { wordLength: length } });
  }

  async findRandomByLevel(level: DifficultyLevel, userId: number) {
    
    const playedWords = await this.gameRepository.find({
      where: { user: { id: userId } },
    });
    const playedWordIds = playedWords?.map((playedWord) => playedWord.id);

    const wordsQb = this.wordRepository
      .createQueryBuilder('word')
      .where('word_length >= :minLength', {
        minLength: LevelLengths[level].minLength,
      })
      .andWhere('word_length <= :maxLength', {
        maxLength: LevelLengths[level].maxLength,
      });

    if (playedWordIds.length) {
      wordsQb.andWhere('id NOT IN (:...playedWordIds)', { playedWordIds });
    }

    const words = await wordsQb.getMany();

    if (!words) {
      throw new NotFoundException();
    }

    return words[Math.floor(Math.random() * words.length)];
  }
}
