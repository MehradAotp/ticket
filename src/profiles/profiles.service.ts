import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Profile } from './profile.schema';
import { Model, Types } from 'mongoose';
import { UpdateProfileDto } from './dto/update-profile.dto';
import * as path from 'path';
import { promises as fs } from 'fs';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectModel(Profile.name) private profileModel: Model<Profile>,
  ) {}

  async createProfile(userId: string, bio: string) {
    const profile = new this.profileModel({
      userId: new Types.ObjectId(userId),
      bio,
      profilePicture: null,
    });
    return profile.save();
  }

  async uploadProfilePicture(userId: string, file: Express.Multer.File) {
    const profile = await this.profileModel.findOne({ userId });
    if (!profile) {
      throw new NotFoundException('Profile Not Found');
    }
    if (!file || !file.filename) {
      throw new BadRequestException('File upload failed, filename is missing');
    }

    // مسیر ذخیره‌سازی تصویر
    const uploadDir = path.join(__dirname, '..', 'uploads');

    // بررسی وجود دایرکتوری uploads و ایجاد آن در صورت عدم وجود
    await fs.mkdir(uploadDir, { recursive: true });

    // به‌روزرسانی مسیر تصویر پروفایل
    profile.profilePicture = file.filename;
    return profile.save();
  }

  async updateProfile(
    userId: string,
    updateProfileDto: UpdateProfileDto,
  ): Promise<Profile> {
    return await this.profileModel.findOneAndUpdate(
      { userId },
      updateProfileDto,
      { new: true },
    );
  }
  async getProfile(userId: string) {
    const profile = await this.profileModel.findOne({ userId });
    if (!profile) {
      throw new NotFoundException('Profile Not Found');
    }
    return profile;
  }
}
