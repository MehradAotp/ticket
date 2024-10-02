import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Event extends Document {
  @Prop({ required: true })
  title: string;
  @Prop()
  description: string;
  @Prop({ required: true })
  date: Date;
  @Prop({ required: true })
  location: string;
  @Prop({ required: true })
  price: number;
}
export const EventSchema = SchemaFactory.createForClass(Event);
