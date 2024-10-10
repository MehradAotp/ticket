import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  async login(
    @Body('username') username: string,
    @Body('password') password: string,
    @Res() res,
  ) {
    const result = await this.authService.login({ username, password });
    return res.status(200).json(result);
  }

  @Post('verify-otp')
  async verifyOtp(
    @Body('email') email: string,
    @Body('otp') otp: string,
    @Res() res,
  ) {
    const result = await this.authService.verifyOtp(email, otp);
    return res.status(200).json(result);
  }
}
