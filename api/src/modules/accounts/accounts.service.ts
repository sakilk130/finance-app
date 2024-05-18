import { Injectable } from '@nestjs/common';
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

  findOne(id: number) {
    return `This action returns a #${id} account`;
  }

  update(id: number, updateAccountDto: UpdateAccountDto) {
    return `This action updates a #${id} account`;
  }

  remove(id: number) {
    return `This action removes a #${id} account`;
  }
}
