import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './users.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { createUserDto } from './dto/createUserDto';
import { ProfilesService } from 'src/profiles/profiles.service';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly profilesService: ProfilesService,
  ) {}

  async createUser(
    username: string,
    password: string,
    email: string,
  ): Promise<createUserDto> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new this.userModel({
      username,
      email,
      password: hashedPassword,
    });
    const savedUser = await user.save(); // ذخیره کاربر در دیتابیس
    await this.profilesService.createProfile(
      savedUser._id.toString(),
      'This is the default bio.',
    );
    const result = savedUser.toObject(); // تبدیل به آبجکت
    return {
      username: result.username,
      email: result.email,
      id: result._id.toString(), // تبدیل به رشته
    };
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.userModel.findOne({ username }).exec();
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ email }).exec();
  }
  async deleteUser(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }
}
