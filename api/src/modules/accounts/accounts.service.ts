import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './entities/account.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}

  async create(createAccountDto: CreateAccountDto, currentUser: User) {
    try {
      const payload = {
        ...createAccountDto,
        user_id: currentUser.id,
      };
      const account = this.accountRepository.create(payload);
      await this.accountRepository.save(account);
      return {
        id: account.id,
        name: account.name,
        user_id: account.user_id,
        plaid_id: account.plaid_id,
      };
    } catch (error) {
      throw error;
    }
  }

  async findAll(currentUser: User) {
    try {
      const accounts = await this.accountRepository.find({
        where: {
          user_id: currentUser.id,
        },
        select: ['id', 'name', 'user_id', 'plaid_id'],
      });
      return accounts;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number, currentUser: User) {
    try {
      const account = await this.accountRepository.findOne({
        where: {
          id,
          user_id: currentUser.id,
        },
        select: ['id', 'name', 'user_id', 'plaid_id'],
      });
      if (!account) {
        throw new NotFoundException('Account not found');
      }
      return account;
    } catch (error) {
      throw error;
    }
  }

  async update(
    id: number,
    updateAccountDto: UpdateAccountDto,
    currentUser: User,
  ) {
    try {
      const account = await this.accountRepository.findOne({
        where: {
          id,
          user_id: currentUser.id,
        },
      });
      if (!account) {
        throw new NotFoundException('Account not found');
      }
      account.name = updateAccountDto.name;
      await this.accountRepository.save(account);
      return {
        id: account.id,
        name: account.name,
        user_id: account.user_id,
        plaid_id: account.plaid_id,
      };
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number, currentUser: User) {
    try {
      const account = await this.accountRepository.findOne({
        where: {
          id,
          user_id: currentUser.id,
        },
      });
      if (!account) {
        throw new NotFoundException('Account not found');
      }
      await this.accountRepository.remove(account);
      return {
        id: account.id,
        name: account.name,
        user_id: account.user_id,
        plaid_id: account.plaid_id,
      };
    } catch (error) {
      throw error;
    }
  }
}
