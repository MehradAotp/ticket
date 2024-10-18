import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { OTP, OtpDocument } from './otp.schema';
import { Model } from 'mongoose';
import * as speakeasy from 'speakeasy';
import * as nodemailer from 'nodemailer';

@Injectable()
export class OtpService {
  constructor(@InjectModel(OTP.name) private otpModel: Model<OtpDocument>) {}
  // تولید کد OTP و ارسال آن به ایمیل کاربر
  async generateOtp(email: string): Promise<void> {
    const code = speakeasy.totp({
      secret: 'YourSecret',
      digits: 6,
    });
    const expiration = new Date();
    expiration.setMinutes(expiration.getMinutes() + 5); // اعتبار ۵ دیقه

    const otp = new this.otpModel({ email, code, expiration });
    await otp.save();

    // تنظیمات ارسال ایمیل
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587, // یا 465 برای SSL
      secure: false, // true برای 465 و false برای 587
      auth: {
        user: process.env.EMAIL_USER,
        // از app password استفاده کنید
        pass: process.env.EMAIL_PASS,
      },
    });

    // ارسال ایمیل
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is ${code}`,
    });
  }
  async verifyOtp(email: string, code: string): Promise<boolean> {
    const otp = await this.otpModel.findOne({ email, code });
    if (!otp) return false;

    const now = new Date();
    if (otp.expiration < now) {
      //otp منقضی شده
      return false;
    }
    return true;
  }
}
