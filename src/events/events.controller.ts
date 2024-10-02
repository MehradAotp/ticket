import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './event.model';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
@Controller('events')
export class EventsController {
  constructor(private readonly eventService: EventsService) {}

  @Get()
  getAllEvent() {
    return this.eventService.getAllEvent();
  }
  @Get(':id')
  getEventById(@Param('id') id: string) {
    return this.eventService.getEventById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createEvent(@Body() createEventDto: CreateEventDto) {
    return this.eventService.createEvent(createEventDto);
  }
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  updateEvent(@Param('id') id: string, @Body() updateEventDto: CreateEventDto) {
    return this.eventService.updateEvent(id, updateEventDto);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteEvent(@Param('id') id: string) {
    return this.eventService.deleteEvent(id);
  }
}
