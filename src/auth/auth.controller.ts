import { Request } from 'express';
import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { UserEntity } from 'src/database/entities';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')  
  @ApiBody({ type: LoginDto, required: true })
  @UseGuards(LocalGuard)
  login(@Req() request: Request) {
    const user = request.user as UserEntity;

    return this.authService.login(user);
  }
}
