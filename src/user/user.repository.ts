import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(
    createUserDto: CreateUserDto,
  ): Promise<Omit<UserEntity, 'password'>> {
    const { password: _, ...rest } = (
      await this.userModel.create(createUserDto)
    ).toObject();
    return rest;
  }

  async findByUsername(username: string): Promise<User> {
    return await this.userModel.findOne({ username });
  }
}
