import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Profile extends Document {
  @Prop({ required: true })
  userId: string;
  @Prop()
  bio: string;
  @Prop()
  profilePicture: string;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
