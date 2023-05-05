import { Injectable } from '@nestjs/common';
import { GameDto } from './dto/game.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GameEntity } from 'src/database/entities';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(GameEntity)
    private readonly gameRepository: Repository<GameEntity>,
  ) {}

  async create(data: GameDto) {
    return 'This action adds a new game';
  }

  async findAll() {
    return this.gameRepository.find();
  }

  async findOne(id: number) {
    return this.gameRepository.findOneBy({ id });
  }

  async update(id: number, data: GameDto) {
    return `This action updates a #${id} game`;
  }
}
