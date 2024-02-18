import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { compare } from 'bcrypt';

import { UsersService } from '../../users/users.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly userService: UsersService) {
    super({
      usernameField: 'username',
      passwordField: 'password',
    });
  }

  async validate(username: string, password: string) {
    const userPassword = await this.userService.findPasswordByUsername(username);

    if (!userPassword) {
      throw new UnauthorizedException();
    }

    const isValidPassword = await compare(password, userPassword);

    if (!isValidPassword) {
      throw new UnauthorizedException();
    }

    const user = await this.userService.findByUserName(username);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
