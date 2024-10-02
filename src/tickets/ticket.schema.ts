import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Event } from 'src/events/events.schema';

@Schema()
export class Ticket extends Document {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Event' })
  eventId: Event;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  totalPrice: number;

  @Prop({ default: Date.now })
  reservationDate: Date;
}
export const TicketSchema = SchemaFactory.createForClass(Ticket);
