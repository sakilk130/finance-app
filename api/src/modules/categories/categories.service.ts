import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { User } from '../users/entities/user.entity';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}
  async create(createCategoryDto: CreateCategoryDto, currentUser: User) {
    try {
      const payload = {
        ...createCategoryDto,
        user_id: currentUser.id,
      };
      const category = await this.categoryRepository.create(payload);
      await this.categoryRepository.save(category);
      return {
        id: category.id,
        name: category.name,
        plaid_id: category.plaid_id,
      };
    } catch (error) {
      throw error;
    }
  }

  async findAll(currentUser: User) {
    try {
      const categories = await this.categoryRepository.find({
        where: {
          user_id: currentUser.id,
        },
        select: ['id', 'name', 'plaid_id'],
      });
      return categories;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number, currentUser: User) {
    try {
      const category = await this.categoryRepository.findOne({
        where: {
          id,
          user_id: currentUser.id,
        },
        select: ['id', 'name', 'plaid_id'],
      });
      if (!category) {
        throw new NotFoundException('Category not found');
      }
      return {
        id: category.id,
        name: category.name,
        plaid_id: category.plaid_id,
      };
    } catch (error) {
      throw error;
    }
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
    currentUser: User,
  ) {
    try {
      const category = await this.findOne(id, currentUser);
      const updatedCategory = await this.categoryRepository.save({
        ...category,
        ...updateCategoryDto,
      });
      return {
        id: updatedCategory.id,
        name: updatedCategory.name,
        plaid_id: updatedCategory.plaid_id,
      };
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number, currentUser: User) {
    try {
      const category = await this.findOne(id, currentUser);
      if (!category) {
        throw new NotFoundException('Category not found');
      }
      await this.categoryRepository.softRemove(category);
      return {
        id: category.id,
        name: category.name,
        plaid_id: category.plaid_id,
      };
    } catch (error) {
      throw error;
    }
  }
}
