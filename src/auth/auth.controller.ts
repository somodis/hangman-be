import { Request } from 'express';
import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';

import { UserEntity } from 'src/database/entities';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { LoginDto } from './dto/auth.dto';
import { LogoutDto } from './dto/logout.dto';

@ApiTags('auth')
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

  @Post('logout')
  @ApiBody({ type: LogoutDto, required: true })
  logout(@Req() request: Request) {
    // TODO
    // const user = request.user as UserEntity;
    // return this.authService.login(user);
  }
}
