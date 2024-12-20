import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { OtpModule } from 'src/otp/otp.module';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    OtpModule,
    JwtModule.register({
      secret: 'secretMerhad',
      signOptions: { expiresIn: '2h' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
