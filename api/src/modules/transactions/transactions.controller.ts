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
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { AuthorizeGuard } from 'src/shared/guards/authorize.guard';
import { ROLE } from 'src/shared/enums/role.enum';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';

@Controller('transactions')
@ApiTags('Transactions')
@UseGuards(AuthGuard, AuthorizeGuard([ROLE.ADMIN, ROLE.USER]))
@ApiBearerAuth('JWT')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  async create(
    @Body() createTransactionDto: CreateTransactionDto,
    @CurrentUser() currentUser: User,
  ) {
    const transaction = await this.transactionsService.create(
      createTransactionDto,
      currentUser,
    );
    return {
      status: 200,
      message: 'Transaction created successfully',
      data: transaction,
    };
  }

  @Get()
  async findAll(@CurrentUser() currentUser: User) {
    const transactions = await this.transactionsService.findAll(currentUser);
    return {
      status: 200,
      message: 'Transactions retrieved successfully',
      data: transactions,
    };
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() currentUser: User,
  ) {
    const transaction = await this.transactionsService.findOne(
      +id,
      currentUser,
    );
    return {
      status: 200,
      message: 'Transaction retrieved successfully',
      data: transaction,
    };
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.transactionsService.update(+id, updateTransactionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionsService.remove(+id);
  }
}
