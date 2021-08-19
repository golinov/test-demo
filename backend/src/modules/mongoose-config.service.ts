import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { Inject } from '@nestjs/common';

export class MongooseConfigService implements MongooseOptionsFactory {
  constructor(
    @Inject(ConfigService) private readonly configService: ConfigService,
  ) {}

  createMongooseOptions(): MongooseModuleOptions {
    console.log(this.configService.get('database'));
    return {
      uri: `mongodb://${this.configService.get<string>(
        'database.user',
      )}:${this.configService.get<string>(
        'database.password',
      )}@${this.configService.get<string>(
        'database.host',
      )}:${this.configService.get<string>(
        'database.port',
      )}/${this.configService.get<string>('database.name')}`,
    };
  }
}
