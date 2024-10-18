import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsDateString,
} from 'class-validator';

export class CreateEventDto {
  @ApiProperty({
    description: 'The title of the event',
    example: 'Concert in the Park',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Description of the event',
    example: 'An amazing concert featuring various artists.',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Date of the event',
    example: '2024-10-25T18:30:00.000Z',
  })
  @IsDateString()
  @IsNotEmpty()
  date: Date;

  @ApiProperty({
    description: 'Location of the event',
    example: 'Central Park, New York',
  })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({
    description: 'Price of the ticket for the event',
    example: 50,
  })
  @IsNumber()
  @IsNotEmpty()
  price: number;
}
