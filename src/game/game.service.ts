import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { GameDto } from './dto/game.dto';
import { GameEntity, UserEntity, WordEntity } from 'src/database/entities';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(GameEntity)
    private readonly gameRepository: Repository<GameEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(WordEntity)
    private readonly wordRepository: Repository<WordEntity>,
  ) {}

  async create(data: GameDto) {
    const user = await this.userRepository.findOneBy({ id: data.userId });
    const word = await this.wordRepository.findOneBy({ id: data.wordId });
    const game = new GameEntity();

    game.user = user;
    game.word = word;

    const result = await this.gameRepository.save(game);

    await this.userRepository.save({ ...user, isInGame: true });
    return result;
  }

  async findAll() {
    return this.gameRepository.find();
  }

  async findOne(id: number) {
    return this.gameRepository.findOneBy({ id });
  }

  async findGameByUserId(userId: number) {
    return this.gameRepository.findOne({
      where: { user: { id: userId }, isInProgress: true },
      relations: { word: true }
    });
  }

  async update(id: number, data: GameDto) {
    const game = await this.findOne(id);

    if (!game) {
      throw new NotFoundException();
    }

    data.id = id;

    return await this.gameRepository.save({
      ...data,
      guessedLetters: data.guessedLetters.toString(),
    });
  }
}
