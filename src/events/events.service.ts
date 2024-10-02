import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Event } from './events.schema';
import { Model } from 'mongoose';
import { CreateEventDto } from './event.model';

@Injectable()
export class EventsService {
  constructor(@InjectModel(Event.name) private eventModel: Model<Event>) {}

  async createEvent(createEventDto: CreateEventDto): Promise<Event> {
    const newEvent = new this.eventModel(createEventDto);
    return await newEvent.save();
  }

  async getAllEvent(): Promise<Event[]> {
    return this.eventModel.find();
  }

  async getEventById(id: string): Promise<Event> {
    const event = this.eventModel.findById(id);
    if (!event) {
      throw new NotFoundException('Event not found');
    }
    return event;
  }

  async updateEvent(
    id: string,
    updateEventDto: CreateEventDto,
  ): Promise<Event> {
    const event = this.eventModel.findByIdAndUpdate(id, updateEventDto);
    if (!event) {
      throw new NotFoundException('Event not found');
    }
    return event;
  }

  async deleteEvent(id: string): Promise<void> {
    const result = await this.eventModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Event not found');
    }
  }
}
