import { Request } from 'express';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { GameService } from './game.service';
import { GameDto } from './dto/game.dto';
import { TokenGuard } from 'src/auth/guards/token.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Role } from 'src/common/role-enum';
import { Id } from 'src/common/id.decorator';
import { UserEntity } from 'src/database/entities';

@ApiTags('game')
@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(TokenGuard, RoleGuard([Role.ADMIN, Role.USER]))
  create(@Body() createGameDto: GameDto, @Req() request: Request) {
    const user = request.user as UserEntity;
    createGameDto.userId = user.id;

    return this.gameService.create(createGameDto);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(TokenGuard, RoleGuard([Role.ADMIN]))
  findAll() {
    return this.gameService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(TokenGuard, RoleGuard([Role.ADMIN, Role.USER]))
  findOne(@Id() id: number) {
    return this.gameService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(TokenGuard, RoleGuard([Role.ADMIN, Role.USER]))
  update(@Id() id: number, @Body() updateGameDto: GameDto) {
    return this.gameService.update(id, updateGameDto);
  }
}
