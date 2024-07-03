import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateTransactionDto {
  @ApiProperty({
    description: 'Amount of the transaction',
    type: Number,
    required: true,
    default: 1000,
  })
  @IsNotEmpty({ message: 'Amount is required' })
  @IsNumber(
    {},
    {
      message: 'Amount must be a number',
    },
  )
  amount: number;

  @ApiProperty({
    description: 'Payee of the transaction',
    type: String,
    required: true,
    default: 'Walmart',
  })
  @IsNotEmpty({ message: 'Payee is required' })
  @IsString({ message: 'Payee must be a string' })
  @Length(3, 50, { message: 'Payee must be between 3 and 50 characters' })
  payee: string;

  @ApiProperty({
    description: 'Notes for the transaction',
    type: String,
    required: false,
    default: 'Groceries',
  })
  @IsOptional()
  @IsString({ message: 'Notes must be a string' })
  notes: string;

  @ApiProperty({
    description: 'Date of the transaction',
    type: Date,
    required: true,
    default: new Date(),
  })
  @IsNotEmpty({ message: 'Date is required' })
  @IsString({ message: 'Date must be a string' })
  date: Date;

  @ApiProperty({
    description: 'Account ID of the transaction',
    type: Number,
    required: true,
    default: 1,
  })
  @IsNotEmpty({ message: 'Account ID is required' })
  @IsNumber(
    {},
    {
      message: 'Account ID must be a number',
    },
  )
  account_id: number;

  @ApiProperty({
    description: 'Category ID of the transaction',
    type: Number,
    required: true,
    default: 1,
  })
  @IsNotEmpty({ message: 'Category ID is required' })
  @IsNumber(
    {},
    {
      message: 'Category ID must be a number',
    },
  )
  category_id: number;
}
