import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    description: 'Name of the user',
    type: String,
    required: true,
    default: 'John Doe',
  })
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  @Length(3, 50, { message: 'Name must be between 3 and 50 characters' })
  name: string;

  @ApiProperty({
    description: 'Email of the user',
    type: String,
    required: true,
    default: 'john@john.com',
  })
  @IsNotEmpty({ message: 'Email is required' })
  @IsString({ message: 'Email must be a string' })
  @IsEmail({}, { message: 'Email must be a valid email' })
  @Length(3, 100, { message: 'Email must be between 3 and 100 characters' })
  email: string;

  @ApiProperty({
    description: 'Password of the user',
    type: String,
    required: true,
    default: 'password',
  })
  @IsNotEmpty({ message: 'Password is required' })
  @IsString({ message: 'Password must be a string' })
  @Length(6, 100, { message: 'Password must be between 6 and 100 characters' })
  password: string;
}
