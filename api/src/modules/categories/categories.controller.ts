import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { AuthorizeGuard } from 'src/shared/guards/authorize.guard';
import { ROLE } from 'src/shared/enums/role.enum';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';

@Controller('categories')
@ApiTags('Categories')
@UseGuards(AuthGuard, AuthorizeGuard([ROLE.ADMIN, ROLE.USER]))
@ApiBearerAuth('JWT')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
    @CurrentUser() currentUser: User,
  ) {
    const category = await this.categoriesService.create(
      createCategoryDto,
      currentUser,
    );
    return {
      status: 200,
      message: 'Category created successfully',
      data: category,
    };
  }

  @Get()
  async findAll(@CurrentUser() currentUser: User) {
    const categories = await this.categoriesService.findAll(currentUser);
    return {
      status: 200,
      message: 'Categories retrieved successfully',
      data: categories,
    };
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() currentUser: User,
  ) {
    const category = await this.categoriesService.findOne(+id, currentUser);
    return {
      status: 200,
      message: 'Category retrieved successfully',
      data: category,
    };
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @CurrentUser() currentUser: User,
  ) {
    const category = await this.categoriesService.update(
      +id,
      updateCategoryDto,
      currentUser,
    );
    return {
      status: 200,
      message: 'Category updated successfully',
      data: category,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @CurrentUser() currentUser: User) {
    const category = await this.categoriesService.remove(+id, currentUser);
    return {
      status: 200,
      message: 'Category deleted successfully',
      data: category,
    };
  }
}
