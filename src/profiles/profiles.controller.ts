import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Profile } from './profile.schema';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profileService: ProfilesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createProfile(
    @Body() createProfileDto: CreateProfileDto,
  ): Promise<Profile> {
    return await this.profileService.createProfile(
      createProfileDto.userId,
      createProfileDto.bio,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('/upload/:id')
  @UseInterceptors(FileInterceptor('file'))
  async uploadProfilePicture(
    @Param('id') userId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.profileService.uploadProfilePicture(userId, file);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getProfile(@Param('id') userId: string) {
    return this.profileService.getProfile(userId);
  }
}
