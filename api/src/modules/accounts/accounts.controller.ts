import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';
import { AuthorizeGuard } from 'src/shared/guards/authorize.guard';
import { ROLE } from 'src/shared/enums/role.enum';
import { AuthGuard } from 'src/shared/guards/auth.guard';

@Controller('accounts')
@ApiTags('Accounts')
@UseGuards(AuthGuard, AuthorizeGuard([ROLE.ADMIN, ROLE.USER]))
@ApiBearerAuth('JWT')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  async create(
    @Body() createAccountDto: CreateAccountDto,
    @CurrentUser() currentUser: User,
  ) {
    const account = await this.accountsService.create(
      createAccountDto,
      currentUser,
    );
    return {
      status: 200,
      message: 'Account created successfully',
      data: account,
    };
  }

  @Get()
  async findAll(@CurrentUser() currentUser: User) {
    const accounts = await this.accountsService.findAll(currentUser);
    return {
      status: 200,
      message: 'Accounts retrieved successfully',
      data: accounts,
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accountsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) {
    return this.accountsService.update(+id, updateAccountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accountsService.remove(+id);
  }
}
