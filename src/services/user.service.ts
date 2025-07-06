import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CreateUserDto } from '../application/dto/create-auth.dto';
import { Role, User } from '../../generated/prisma'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: CreateUserDto): Promise<User> {
    const user = await this.prisma.user.create({
      data,
    });
    return user;
  }
}
