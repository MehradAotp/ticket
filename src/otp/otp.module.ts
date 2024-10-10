import { Module } from '@nestjs/common';
import { OtpService } from './otp.service';
import { OtpController } from './otp.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OTP, OtpSchema } from './otp.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: OTP.name, schema: OtpSchema }])],
  providers: [OtpService],
  controllers: [OtpController],
  exports: [OtpService],
})
export class OtpModule {}
