import { Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Profile, ProfileSchema } from './profile.schema';
import { ProfilesController } from './profiles.controller';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { MulterModule } from '@nestjs/platform-express';

const storage = diskStorage({
  destination: './uploads', // دایرکتوری ذخیره‌سازی فایل‌های آپلود شده
  filename: (req, file, cb) => {
    const uniqueSuffix = uuidv4(); // تولید یک نام یکتا
    const fileExtension = extname(file.originalname); // استخراج پسوند فایل
    cb(null, `${uniqueSuffix}${fileExtension}`); // نام جدید فایل
  },
});

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Profile.name, schema: ProfileSchema }]),
    MulterModule.register({
      storage: storage, // استفاده از تنظیمات ذخیره‌سازی
    }),
  ],
  providers: [ProfilesService],
  controllers: [ProfilesController],
  exports: [ProfilesService],
})
export class ProfilesModule {}
