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
    } else {
      const hashedPassword = await hash(data.password, 10);
      return await this.usersRepository.save({ ...data, password: hashedPassword });
    }
  }

  async findAll() {
    return this.usersRepository.find();
  }

  async findOne(id: number) {
    return `This action returns a #${id} user`;
  }
  async findByUserName(username: string) {
    return await this.usersRepository.findOneBy({username});
  }

  async update(id: number, updateUserDto: UserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
