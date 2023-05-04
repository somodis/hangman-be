import { BadRequestException, Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { hash } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/database/entities';
import { Repository } from 'typeorm';

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

  async findOne(id: number) {
    return this.usersRepository.findOneBy({ id });
  }

  async findUserGame(userId: number) {
    //todo
    return this.usersRepository.find({relations: {game: true}, where: {game: {id: 1}}})
  }

  async findByUserName(username: string) {
    return await this.usersRepository.findOneBy({ username });
  }
}
