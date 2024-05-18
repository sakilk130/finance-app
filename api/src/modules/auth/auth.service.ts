import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcrypt';
import { config } from 'dotenv';
import * as jwt from 'jsonwebtoken';

import { RegisterDto } from './dto/register.dto';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { SignInDto } from './dto/sign-in.dto';

config();

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly userService: UsersService,
  ) {}

  async register(registerDto: RegisterDto) {
    try {
      const user = await this.userService.create(registerDto);
      const token = await this.generateToken(user);
      delete user.password;
      delete user.deleted_at;
      delete user.updated_at;
      delete user.created_at;
      return { user, token };
    } catch (error) {
      throw error;
    }
  }

  async signIn(signInDto: SignInDto) {
    try {
      const user = await this.userRepository.findOne({
        where: {
          email: signInDto.email,
        },
        select: ['id', 'email', 'name', 'password', 'role', 'is_active'],
      });

      if (!user) {
        throw new Error('Email or password is incorrect');
      }

      if (!user.is_active) {
        throw new Error('User is not active. Please contact the admin');
      }

      const isPasswordMatch = await compare(signInDto.password, user.password);
      if (!isPasswordMatch) {
        throw new Error('Email or password is incorrect');
      }
      const token = await this.generateToken(user);
      delete user.password;
      return { user, token };
    } catch (error) {
      throw error;
    }
  }

  async generateToken(user: User) {
    try {
      const payload = {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '30d',
      });
      return token;
    } catch (error) {
      throw error;
    }
  }
}
