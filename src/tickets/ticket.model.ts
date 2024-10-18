import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateTicketDto {
  @ApiProperty({
    description: 'Username of the person creating the ticket',
    example: 'Mehrad',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'ID of the event for which the ticket is created',
    example: '66fd15ae3802e4409738f01e',
  })
  @IsString()
  @IsNotEmpty()
  eventId: string;

  @ApiProperty({
    description: 'Number of tickets to be created',
    example: 3,
  })
  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}
