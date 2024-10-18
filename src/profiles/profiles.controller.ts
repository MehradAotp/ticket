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
import {
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  CustomApiResponse,
  CustomApiResponseWithParam,
} from 'src/decorators/decorator.ApiResponse';

@ApiTags('Profiles')
@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profileService: ProfilesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({
    summary: 'Create a new Profile',
    description: 'Creates a new Profile by providing userId,bio.',
    operationId: 'CreateProfileDto',
  })
  @ApiBody({
    description: 'Payload to create a new Profile',
    schema: {
      type: 'object',
      properties: {
        userId: {
          type: 'string',
          example: '66fda2d340e8b96af7fb90bd',
        },
        bio: {
          type: 'string',
          example: 'This is Bio.',
        },
      },
    },
  })
  @CustomApiResponse()
  @ApiCreatedResponse({
    description: 'The Profile has been successfully created.',
  })
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
  @ApiOperation({
    summary: 'Upload profile picture',
    description: 'Upload a profile picture for the user.',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @CustomApiResponseWithParam('ID of the User', 'Profile not found.')
  @UseInterceptors(FileInterceptor('file'))
  async uploadProfilePicture(
    @Param('id') userId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.profileService.uploadProfilePicture(userId, file);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({
    summary: 'Getting profile User',
    description: 'Getting profile User.',
  })
  @CustomApiResponseWithParam('ID of the User', 'Profile not found.')
  async getProfile(@Param('id') userId: string) {
    return this.profileService.getProfile(userId);
  }
}
