import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../database/prisma.service';
import { User } from './entities/user.entity';

@Injectable()
export class UserRepository {
  private readonly User: PrismaService['user'];
  constructor(private readonly prisma: PrismaService) {
    this.User = prisma.user;
  }

  async create(createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
    const { password: _, ...rest } = await this.User.create({
      data: createUserDto,
    });
    return rest;
  }
}
