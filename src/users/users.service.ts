/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const existingEmail = await this.userRepo.findOne({
        where: {
          email: createUserDto.email
        }
      });
      if (existingEmail) {
        throw new ConflictException('E-mail já está em uso.');
      }
      
      const existingUserName = await this.userRepo.findOne({
        where: {
          username: createUserDto.username
        }
      });
      if (existingUserName) {
        throw new ConflictException('Nome de usuário já está em uso.');
      }

      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      const newUser = this.userRepo.create({
        name: createUserDto.name,
        email: createUserDto.email,
        username: createUserDto.username,
        password: hashedPassword,
      });

      return await this.userRepo.save(newUser);

    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    const users = await this.userRepo.find();

    if (!users || users.length === 0) {
      return { message: 'Sem usuários cadastrados'}
    }

    return { 'users': users };

  }

  findOne(id: string) {
    return this.userRepo.findOne({
      where: { id },
    })
  }
}
