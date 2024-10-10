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
      return {
        username: result.username,
        id: result._id,
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

    return {
      message: 'Login successful',
      access_token: this.jwtService.sign(payload),
    };
  }
}
