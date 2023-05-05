import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import { UsersService } from './users.service';
import { Role } from 'src/common/role-enum';
import { UserDto } from './dto/user.dto';
import { TokenGuard } from 'src/auth/guards/token.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { UserEntity } from 'src/database/entities';
import { Id } from 'src/common/id.decorator';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  // @ApiBearerAuth()
  // @UseGuards(TokenGuard, RoleGuard([Role.ADMIN]))
  create(@Body() createUserDto: UserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(TokenGuard, RoleGuard([Role.ADMIN]))
  findAll() {
    return this.usersService.findAll();
  }

  @Get('me')
  @ApiBearerAuth()
  @UseGuards(TokenGuard, RoleGuard([Role.ADMIN, Role.USER]))
  async getProfile(@Req() request: Request) {
    const user = request.user as UserEntity;
    return this.usersService.findOne(user.id);
  }

  @Get('scoreboard')
  @ApiBearerAuth()
  @UseGuards(TokenGuard, RoleGuard([Role.ADMIN, Role.USER]))
  async scoreboard(@Req() request: Request) {
    const user = request.user as UserEntity;
    return this.usersService.scoreboard(user.id);
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(TokenGuard, RoleGuard([Role.ADMIN, Role.USER]))
  findOne(@Id() id: number) {
    return this.usersService.findOne(+id);
  }
}
