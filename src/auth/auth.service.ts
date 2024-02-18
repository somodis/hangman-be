import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserEntity } from 'src/database/entities';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  login(user: UserEntity) {
    const token = this.jwtService.sign({
      sub: user.id,
    });

    return {
      token: {
        accessToken: token,
      },
    };
  }
}
