import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { CreateTicketDto } from './ticket.model';
import { TicketsService } from './tickets.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Ticket } from './ticket.schema';
import {
  CustomApiResponse,
  CustomApiResponseWithoutSecurity,
  CustomApiResponseWithParam,
} from 'src/decorators/decorator.ApiResponse';

@ApiTags('Tickets')
@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketService: TicketsService) {}
  //Post
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({
    summary: 'Create a new ticket',
    description:
      'Create a ticket for an event by providing eventId, username, and quantity.',
    operationId: 'CreateTicketDto',
  })
  @ApiBody({
    description: 'Payload to create a ticket',
    schema: {
      type: 'object',
      properties: {
        eventId: { type: 'string', example: '66fd15ae3802e4409738f01e' },
        username: { type: 'string', example: 'Mehrad' },
        quantity: { type: 'number', example: 3 },
      },
    },
  })
  @CustomApiResponse()
  @ApiCreatedResponse({
    description: 'The Ticket has been successfully created.',
  })
  async createTicket(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketService.createTicket(createTicketDto);
  }
  //Get
  @Get()
  @ApiOperation({
    summary: 'Get All ticket',
    description: 'Get All ticket',
  })
  @ApiOkResponse({
    description: 'Successfully fetched all tickets.',
    type: [Ticket],
    example: {
      _id: '66fd3373fa864887efce0b58',
      username: 'Mehrad',
      eventId: {
        _id: '66fd15ae3802e4409738f01e',
        title: 'Shadmehr Aghili',
        description: 'Live concert featuring various artists.',
        date: '2024-10-15T19:30:00.000Z',
        location: 'Stadium A',
        price: 50,
      },
      quantity: 3,
      totalPrice: 150,
      reservationDate: '2024-10-02T11:50:11.683Z',
    },
  })
  async getAllTickets(): Promise<Ticket[]> {
    return this.ticketService.getAllTicket();
  }
  //Get:id
  @Get(':id')
  @CustomApiResponseWithoutSecurity('ID of the ticket', 'ticket not found.')
  @ApiOkResponse({
    description: 'Successfully fetched ticket.',
    type: [Ticket],
    example: {
      _id: '66fda7beb76d4728ea2e999c',
      username: 'mehrad',
      eventId: '66fd15ae3802e4409738f01e',
      quantity: 6,
      totalPrice: 5016,
      reservationDate: '2024-10-02T20:06:22.897Z',
    },
  })
  @ApiOperation({
    summary: 'Get Ticket With ID',
    description: 'Getting the information of a ticket with ID.',
  })
  async getTicketById(@Param('id') ticketId: string) {
    return this.ticketService.getTicketById(ticketId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOperation({
    summary: 'Update Ticket With ID',
    description: 'Updating the information of a Ticket with ID.',
  })
  @CustomApiResponseWithParam('ID of the Ticket', 'Ticket Not Found')
  updateTicket(
    @Param('id') id: string,
    @Body() updateEventDto: CreateTicketDto,
  ) {
    return this.ticketService.updateTicket(id, updateEventDto);
  }

  //Delete
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @CustomApiResponseWithParam('ID of the Ticket', 'Ticket Not Found')
  @ApiOperation({
    summary: 'Delete a Ticket',
    description: 'Delete a ticket with ID.',
  })
  async deleteTicket(@Param('id') ticketId: string) {
    return this.ticketService.deleteTicket(ticketId);
  }
}
