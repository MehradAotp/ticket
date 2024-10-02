import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findByUsername(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      const result = user.toObject();
      delete result.password; // حذف رمز عبور
      return result; // برگشت نتیجه بدون رمز عبور
    }
    return null;
  }

  async login(user: any) {
    const users = await this.validateUser(user.username, user.password);
    if (!users) {
      throw new UnauthorizedException('Invalid credentials'); // در صورتی که اطلاعات نادرست باشد
    }
    const payload = { username: user.username, sub: user._id };
    if (payload) {
      console.log(user._id);
    }
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
