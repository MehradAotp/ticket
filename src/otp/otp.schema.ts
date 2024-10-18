import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OtpDocument = OTP & Document;
@Schema({ timestamps: true })
export class OTP {
  @Prop({ required: true })
  email: string;
  @Prop({ required: true })
  code: string;
  @Prop({ required: true, expires: '1m' })
  expiration: Date;
}

export const OtpSchema = SchemaFactory.createForClass(OTP);
OtpSchema.index({ expiration: 1 }, { expireAfterSeconds: 1 });
