import { Injectable } from '@nestjs/common';
import { GameDto } from './dto/game.dto';

@Injectable()
export class GameService {
  async create(createGameDto: GameDto) {
    return 'This action adds a new game';
  }

  async findAll() {
    return `This action returns all game`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} game`;
  }

  async update(id: number, updateGameDto: GameDto) {
    return `This action updates a #${id} game`;
  }

  async remove(id: number) {
    return `This action removes a #${id} game`;
  }
}
