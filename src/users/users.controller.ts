import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
  Patch,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import { UsersService } from './users.service';
import { Role } from 'src/common/role-enum';
import { UpdateUserDto, UserDto } from './dto/user.dto';
import { TokenGuard } from 'src/auth/guards/token.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { UserEntity } from 'src/database/entities';
import { Id } from 'src/common/id.decorator';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(TokenGuard, RoleGuard([Role.ADMIN]))
  async create(@Body() createUserDto: UserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(TokenGuard, RoleGuard([Role.ADMIN]))
  async findAll() {
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
  async scoreboard(@Req() request: Request) {
    const user = request.user as UserEntity;
    return this.usersService.scoreboard(user?.id);
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(TokenGuard, RoleGuard([Role.ADMIN, Role.USER]))
  async findOne(@Id() id: number) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(TokenGuard, RoleGuard([Role.ADMIN, Role.USER]))
  async updateUser(@Id() id: number, @Body() data: UpdateUserDto) {
    return this.usersService.update(id, data);
  }
}
