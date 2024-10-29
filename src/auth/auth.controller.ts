import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  @ApiOperation({
    summary: 'Request OTP For Login',
    description: 'Request OTP For Login.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @ApiBadRequestResponse({
    description: 'Invalid input data.',
  })
  @ApiBody({
    description: 'Payload To Login',
    schema: {
      type: 'object',
      properties: {
        username: {
          type: 'string',
          example: 'Mehrad',
        },
        password: {
          type: 'string',
          example: 'Mehrad123456789',
        },
      },
    },
  })
  async login(
    @Body('username') username: string,
    @Body('password') password: string,
    @Res() res,
  ) {
    const result = await this.authService.login({ username, password });
    return res.status(200).json(result);
  }

  @Post('verify-otp')
  @ApiOperation({
    summary: 'Accept Login',
    description: 'Accept Login.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @ApiBadRequestResponse({
    description: 'Invalid input data.',
  })
  @ApiOkResponse({ description: 'Login Successful' })
  @ApiBody({
    description: 'Payload To Login',
    schema: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          example: 'Mehrad@gmail.com',
        },
        otp: {
          type: 'string',
          example: '676248',
        },
      },
    },
  })
  async verifyOtp(
    @Body('email') email: string,
    @Body('otp') otp: string,
    @Res() res,
  ) {
    const result = await this.authService.verifyOtp(email, otp);
    return res.status(200).json(result);
  }
}
