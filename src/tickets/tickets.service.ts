import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Ticket } from './ticket.schema';
import { Model } from 'mongoose';
import { EventsService } from 'src/events/events.service';
import { CreateTicketDto } from './ticket.model';

@Injectable()
export class TicketsService {
  constructor(
    @InjectModel(Ticket.name) private ticketModel: Model<Ticket>,
    private eventService: EventsService,
  ) {}
  //ایجاد تیکت
  async createTicket(createTicketDto: CreateTicketDto): Promise<Ticket> {
    const { username, eventId, quantity } = createTicketDto;

    // دریافت رویداد و بررسی موجودی بلیت‌ها
    const event = await this.eventService.getEventById(eventId);
    if (!event) {
      throw new NotFoundException('Event not found');
    }
    //محاسبه کل قیمت
    const totalPrice = event.price * quantity;
    //
    const newTicket = new this.ticketModel({
      username,
      eventId,
      quantity,
      totalPrice,
    });
    return await newTicket.save();
  }

  //دریافت کل تیکت ها
  async getAllTicket(): Promise<Ticket[]> {
    return this.ticketModel.find().populate('eventId').exec();
  }

  async getTicketById(id: string): Promise<Ticket> {
    const ticket = this.ticketModel.findById(id).exec();
    if (!ticket) {
      throw new NotFoundException('ticket not found');
    }
    return ticket;
  }

  async deleteTicket(id: string): Promise<void> {
    const ticket = await this.ticketModel.deleteOne({ _id: id }).exec();
    if (ticket.deletedCount === 0) {
      throw new NotFoundException('Ticket not found');
    }
  }
}
