import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { User } from '../users/entities/user.entity';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { CategoriesService } from '../categories/categories.service';
import { AccountsService } from '../accounts/accounts.service';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    private readonly categoryService: CategoriesService,
    private readonly accountService: AccountsService,
    @InjectDataSource()
    private readonly connection: DataSource,
  ) {}
  async create(createTransactionDto: CreateTransactionDto, currentUser: User) {
    try {
      const findCategory = await this.categoryService.findOne(
        createTransactionDto.category_id,
        currentUser,
      );
      if (!findCategory) {
        throw new NotFoundException('Category not found');
      }
      const findAccount = await this.accountService.findOne(
        createTransactionDto.account_id,
        currentUser,
      );
      if (!findAccount) {
        throw new NotFoundException('Account not found');
      }

      const transaction = await this.transactionRepository.create({
        ...createTransactionDto,
        account_id: findAccount.id,
        category_id: findCategory.id,
      });
      const payload = await this.transactionRepository.save(transaction);
      delete payload.deleted_at;
      delete payload.deleted_by;
      return payload;
    } catch (error) {
      throw error;
    }
  }

  async findAll(currentUser: User) {
    try {
      const transactions = await this.connection.query(
        `
        SELECT 
          t.id as id,
          t.amount as amount,
          t.date as date,
          t.payee as payee,
          t.notes as notes,
          c.id as category_id,
          c.name as category_name,
          a.id as account_id,
          a.name as account_name
        FROM
          transaction t
        JOIN account  a ON t.account_id = a.id AND a.deleted_at IS NULL AND a.user_id = ?
        JOIN category c ON t.category_id = c.id AND c.deleted_at IS NULL AND c.user_id = ?
        WHERE
          t.deleted_at IS NULL
      `,
        [currentUser.id, currentUser.id],
      );
      return transactions;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number, currentUser: User) {
    try {
      const transaction = await this.connection.query(
        `
        SELECT 
          t.id as id,
          t.amount as amount,
          t.date as date,
          t.payee as payee,
          t.notes as notes,
          c.id as category_id,
          c.name as category_name,
          a.id as account_id,
          a.name as account_name
        FROM
          transaction t
        JOIN account  a ON t.account_id = a.id AND a.deleted_at IS NULL AND a.user_id = ?
        JOIN category c ON t.category_id = c.id AND c.deleted_at IS NULL AND c.user_id = ?
        WHERE
          t.id = ? AND t.deleted_at IS NULL
        `,
        [currentUser.id, currentUser.id, id],
      );
      if (transaction.length === 0) {
        throw new NotFoundException('Transaction not found');
      }
      return transaction[0];
    } catch (error) {
      throw error;
    }
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
