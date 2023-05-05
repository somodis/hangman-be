import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';

import { WordService } from './word.service';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { TokenGuard } from 'src/auth/guards/token.guard';
import { Role } from 'src/common/role-enum';
import { DifficultyLevel, WordDto } from './dto/word.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Id } from 'src/common/id.decorator';
import { Request } from 'express';

@Controller('words')
export class WordController {
  constructor(private readonly wordService: WordService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(TokenGuard, RoleGuard([Role.ADMIN]))
  create(@Body() createWordDto: WordDto) {
    return this.wordService.create(createWordDto);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(TokenGuard, RoleGuard([Role.ADMIN]))
  findAll() {
    return this.wordService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(TokenGuard, RoleGuard([Role.ADMIN]))
  findOne(@Id() id: number) {
    return this.wordService.findOne(+id);
  }

  @Get('/random/:level')
  @ApiBearerAuth()
  @UseGuards(TokenGuard, RoleGuard([Role.ADMIN, Role.USER]))
  findRandomByLevel(
    @Param('level') level: DifficultyLevel,
    @Req() request: Request,
  ) {
    // todo: userId
    return this.wordService.findRandomByLevel(level, 1);
  }
}
