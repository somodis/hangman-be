import { BadRequestException, Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { hash } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/database/entities';
import { In, Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async create(data: UserDto) {
    const user = await this.findByUserName(data.username);

    if (user) {
      throw new BadRequestException('USER_ALREADY_EXISTS');
    }
    const hashedPassword = await hash(data.password, 10);
    return await this.usersRepository.save({
      ...data,
      password: hashedPassword,
    });
  }

  async findAll() {
    return this.usersRepository.find();
  }
  async scoreboard(userId?: number) {
    const limit = 3;

    const toplist = await this.usersRepository.find({
      order: { score: 'DESC' },
      take: limit,
    });

    if (userId) {
      const me = await this.usersRepository.findOneBy({ id: userId });
      me.score < toplist[limit - 1].score && toplist.push(me);
    }

    return toplist;
  }

  async findOne(id: number) {
    return this.usersRepository.findOneBy({ id });
  }

  async findUserGames(userId: number) {
    //todo userid
    return this.usersRepository.find({
      relations: { games: true },
      where: { games: { id: In([1]) } },
    });
  }

  async findByUserName(username: string) {
    return await this.usersRepository.findOneBy({ username });
  }
}
