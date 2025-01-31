import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../../services/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { ConflictException } from '@nestjs/common';
import { SearchParams } from '../../types/common.types';
import { paginationClause } from '../../helpers/utils.helper';
import {
  PersonOrderFields,
  SearchUser,
  UserOrderFields,
} from '../../types/user.types';
import { UpdateMeDto } from './dto/update-me.dto';
import { Prisma } from '@prisma/client';
import { CreateAddressDto, CreatePersonDto } from './dto/create-person.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(createUserDto: CreateUserDto) {
    const { email, cpfCnpj, username, password, ...rest } = createUserDto;

    const existingEmail = await this.prisma.user.findFirst({
      where: { email },
    });
    if (existingEmail) {
      throw new ConflictException('Email já cadastrado.');
    }

    const existingCpfCnpj = await this.prisma.user.findFirst({
      where: { cpfCnpj },
    });
    if (existingCpfCnpj) {
      throw new ConflictException('CPF/CNPJ já cadastrado.');
    }

    const existingUsername = await this.prisma.user.findFirst({
      where: { username },
    });
    if (existingUsername) {
      throw new ConflictException('Username já cadastrado.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const data: any = {
      ...rest,
      email,
      cpfCnpj,
      username,
      password: hashedPassword,
    };

    const createdUser = await this.prisma.user.create({ data });
    return { ...createdUser, password: undefined };
  }

  findOneByEmailOrUsername(identity: string) {
    return this.prisma.user.findFirst({
      where: {
        OR: [{ email: identity }, { username: identity }],
      },
    });
  }

  async listAllUsers(params: SearchParams<UserOrderFields>) {
    const { skip, orderByClause, take } = paginationClause(params);
    const { search, page, limit } = params;

    const whereClause: SearchUser = search
      ? {
          username: {
            contains: search,
            mode: 'insensitive',
          },
        }
      : undefined;

    const [output, total] = await this.prisma.$transaction([
      this.prisma.user.findMany({
        skip: skip,
        take,
        where: {
          ...whereClause,
          isDeleted: false,
        },
        orderBy: orderByClause,
        select: {
          cpfCnpj: true,
          deletedAt: true,
          createdAt: true,
          email: true,
          isActive: true,
          termsIp: true,
          isDeleted: true,
          termsAccepted: true,
          id: true,
          username: true,
          activatedAt: true,
          updatedAt: true,
        },
      }),
      this.prisma.user.count({
        where: {
          ...whereClause,
          isDeleted: false,
        },
      }),
    ]);

    return {
      output,
      page: page || 1,
      totalPages: limit ? Math.ceil(total / limit) : 1,
      total,
    };
  }

  async findOneUser(id: string) {
    const { password: _, ...user } = await this.prisma.user.findUnique({
      where: { id },
      include: { person: true },
    });

    return user;
  }

  async updateMe(id: string, updateMeDto: UpdateMeDto) {
    const user = await this.findOneUser(id);

    if (!user) {
      throw new NotFoundException(`O usuário ${id} não foi encontrado.`);
    }

    const { email, cpfCnpj, person, username } = updateMeDto;
    const { address, ...restPerson } = person;

    const personData = {
      ...restPerson,
      email: email ?? user.email,
      cpfCnpj: cpfCnpj ?? user.cpfCnpj,
      address: !user.person?.addressId
        ? { create: address as CreateAddressDto }
        : { update: address },
    };

    return this.prisma.user.update({
      data: {
        username,
        email,
        cpfCnpj,
        person: !user.personId
          ? { create: personData }
          : { update: personData },
      },
      where: { id },
    });
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOneUser(id);
    const data = updateUserDto;

    if (!user) {
      throw new NotFoundException(`O usuário ${id} não foi encontrado.`);
    }

    if (data.password) {
      data.password = await bcrypt.hash(
        updateUserDto.password,
        await bcrypt.genSalt(),
      );
    }

    await this.prisma.user.update({
      where: { id },
      data: { tokenVersion: { increment: 1 } },
    });

    return this.prisma.user.update({ data, where: { id } });
  }

  async deleteUser(id: string) {
    const deletedAt = new Date();
    return this.prisma.user.update({
      where: { id },
      data: {
        isDeleted: true,
        deletedAt,
        tokenVersion: { increment: 1 },
      },
    });
  }

  async findOneByEmail(email: string) {
    return this.prisma.user.findFirst({ where: { email } });
  }

  async findOneByUsername(username: string) {
    return this.prisma.user.findFirst({ where: { username } });
  }

  async findOneByCpfCnpj(cpfCnpj: string) {
    return this.prisma.user.findFirst({ where: { cpfCnpj } });
  }

  async updateUserTerms(userId: string, termsAccepted: boolean) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { termsAccepted, termsIp: 'user_ip_address' }, // Update with actual user IP
    });
  }

  async listAllPersons(params: SearchParams<PersonOrderFields>) {
    const { skip, orderByClause, take } = paginationClause(params);
    const { search, page, limit } = params;

    const whereClause: Prisma.StringFilter<'Person'> = search
      ? {
          contains: search,
          mode: 'insensitive',
        }
      : undefined;

    const [output, total] = await this.prisma.$transaction([
      this.prisma.person.findMany({
        skip: skip,
        take,
        where: {
          OR: [
            {
              name: whereClause,
            },
            {
              email: whereClause,
            },
          ],
          isDeleted: false,
        },
        orderBy: orderByClause,
      }),
      this.prisma.person.count({
        where: {
          ...whereClause,
          isDeleted: false,
        },
      }),
    ]);

    return {
      output,
      page: page || 1,
      totalPages: limit ? Math.ceil(total / limit) : 1,
      total,
    };
  }

  async createPerson(data: CreatePersonDto) {
    return this.prisma.person.create({
      data,
    });
  }

  async findMe(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        email: true,
        username: true,
        cpfCnpj: true,
        person: {
          select: {
            name: true,
            fantasyName: true,
            phone1: true,
            phone2: true,
            birthDate: true,
            notes: true,
            address: true,
          },
        },
      },
    });
  }
}
