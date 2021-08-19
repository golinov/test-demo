import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { Profile } from './profile.schema';
import {
  ApiBadRequestResponse,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FindOneProfileDto } from './dto/find-one-profile.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Express } from 'express';
import { diskStorage } from 'multer';
import { filename } from '../../utils/file-interceptor/file-name';
import { imageFileFilter } from '../../utils/image-file-filter';
import { IsPhoto } from '../common/decorators/is-photo.decorator';

@ApiTags('Profile')
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('photo', {
      fileFilter: imageFileFilter,
    }),
  )
  @ApiOperation({ summary: 'Create profile' })
  @ApiCreatedResponse({ type: Profile })
  @ApiBadRequestResponse()
  async create(
    @Body() createProfileDto: CreateProfileDto,
    @IsPhoto('photo')
    @UploadedFile()
    photo: Express.Multer.File,
  ): Promise<Profile> {
    return this.profileService.createProfile(createProfileDto, photo);
  }

  @Get(':profileId')
  @ApiOperation({ summary: 'Get profile by id' })
  @ApiOkResponse({ type: Profile })
  findOne(@Param() param: FindOneProfileDto): Promise<Profile> {
    return this.profileService.findOne({ _id: param.profileId });
  }
}
