import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Profile, ProfileDocument } from './profile.schema';
import { FilterQuery, Model } from 'mongoose';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Express } from 'express';
import * as sharp from 'sharp';
import * as uuid from 'uuid';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile.name)
    private readonly profileModel: Model<ProfileDocument>,
  ) {}

  create(data: CreateProfileDto): Promise<Profile> {
    return this.profileModel.create(data);
  }

  findOne(conditions: FilterQuery<ProfileDocument>): Promise<Profile> {
    return this.profileModel.findOne(conditions).exec();
  }

  async createProfile(
    profile: CreateProfileDto,
    photo: Express.Multer.File,
  ): Promise<Profile> {
    const filename = await this.saveImage(photo);

    return this.create({ ...profile, photo: filename });
  }

  async saveImage(photo: Express.Multer.File): Promise<string> {
    try {
      const fileExtension = photo.originalname.split('.').pop();
      const filename = `${uuid.v4()}.${fileExtension}`;
      await sharp(photo.buffer)
        .rotate()
        .resize(200, 200)
        .toFile(`files/${filename}`);

      return filename;
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }
}
