import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { OtpService } from 'src/otp/otp.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private otpService: OtpService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findByUsername(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      const result = user.toObject();
      return {
        username: result.username,
        id: result._id,
        email: result.email,
      };
    }
    return 'Not Authorized';
  }

  async login(payload: any) {
    const { username, password } = payload;

    const user = await this.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials'); // در صورتی که اطلاعات نادرست باشد
    }

    // ارسال کد OTP به ایمیل کاربر
    await this.otpService.generateOtp(user.email);
    return {
      message: 'OTP sent to your email',
      user: user, // اطلاعات کاربر برای استفاده در مرحله بعد
    };
  }

  // تایید OTP و ارسال JWT
  async verifyOtp(email: string, otp: string) {
    const isValid = await this.otpService.verifyOtp(email, otp);
    if (!isValid) {
      throw new UnauthorizedException('Invalid OTP');
    }
    // پس از تایید OTP، توکن JWT تولید می‌شود
    const user = await this.userService.findByEmail(email);
    const payload = { username: user.username, id: user._id };
    return {
      message: 'Login successful',
      access_token: this.jwtService.sign(payload),
    };
  }
}
