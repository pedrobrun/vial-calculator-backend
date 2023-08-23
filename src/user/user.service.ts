import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  private hashSalt = 12;

  async create(createUserDto: CreateUserDto) {
    const { password, username } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, this.hashSalt);
    return await this.userRepository.create({
      username,
      password: hashedPassword,
    });
  }
}
