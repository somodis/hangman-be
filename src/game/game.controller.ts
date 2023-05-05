import { Controller, Get, Post, Body, Patch, UseGuards } from '@nestjs/common';
import { GameService } from './game.service';
import { GameDto } from './dto/game.dto';
import { TokenGuard } from 'src/auth/guards/token.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Role } from 'src/common/role-enum';
import { Id } from 'src/common/id.decorator';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post()
  @UseGuards(TokenGuard, RoleGuard([Role.ADMIN, Role.USER]))
  create(@Body() createGameDto: GameDto) {
    return this.gameService.create(createGameDto);
  }

  @Get()
  @UseGuards(TokenGuard, RoleGuard([Role.ADMIN]))
  findAll() {
    return this.gameService.findAll();
  }

  @Get(':id')
  @UseGuards(TokenGuard, RoleGuard([Role.ADMIN, Role.USER]))
  findOne(@Id() id: number) {
    return this.gameService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(TokenGuard, RoleGuard([Role.ADMIN, Role.USER]))
  update(@Id() id: number, @Body() updateGameDto: GameDto) {
    return this.gameService.update(id, updateGameDto);
  }
}
