import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CreateTicketDto } from './ticket.model';
import { TicketsService } from './tickets.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketService: TicketsService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  async createTicket(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketService.createTicket(createTicketDto);
  }

  @Get()
  async getAllTickets() {
    return this.ticketService.getAllTicket();
  }

  @Get(':id')
  async getTicketById(@Param('id') ticketId: string) {
    return this.ticketService.getTicketById(ticketId);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteTicket(@Param('id') ticketId: string) {
    return this.ticketService.deleteTicket(ticketId);
  }
}
