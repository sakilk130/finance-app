import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsNotEmpty,
  Min,
} from 'class-validator';

export class DeleteAccountDto {
  @ApiProperty({
    description: 'Ids of the account',
    type: [Number],
    required: true,
    default: [1],
  })
  @IsNotEmpty({ message: 'Ids is required' })
  @IsArray({ message: 'Ids must be an array of numbers' })
  @ArrayNotEmpty({ message: 'Ids must not be empty' })
  @ArrayMinSize(1, { message: 'Ids must have at least 1 item' })
  @ArrayMaxSize(100, { message: 'Ids must not have more than 100 items' })
  @IsInt({ each: true, message: 'Ids must be an integer' })
  @Min(1, { each: true, message: 'Ids must be greater than or equal to 1' })
  ids: number[];
}
