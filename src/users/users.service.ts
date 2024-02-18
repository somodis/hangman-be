import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { hash } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/database/entities';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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
    return this.usersRepository.save({
      ...data,
      password: hashedPassword,
    });
  }

  async update(id: number, data: UpdateUserDto) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('USER_DOES_NOT_EXISTS');
    }

    return this.usersRepository.save({ ...data, id });
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
      if (me.score < toplist[toplist.length - 1].score) {
        toplist.push(me);
      }
    }

    return toplist;
  }

  async findOne(id: number) {
    return this.usersRepository.findOneBy({ id });
  }

  async findByUserName(username: string) {
    return this.usersRepository.findOneBy({ username });
  }

  async findPasswordByUsername(username: string) {
    const user = await this.usersRepository.findOne({
      where: { username },
      select: ['password'],
    });

    return user?.password;
  }
}
