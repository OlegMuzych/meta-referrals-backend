import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { User } from '../userManager/entities/user.entity';

@Injectable()
export class PostgreSqlConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get<string>('database.host'),
      port: this.configService.get<number>('database.port'),
      username: this.configService.get<string>('database.userManager'),
      password: this.configService.get<string>('database.password'),
      database: this.configService.get<string>('database.name'),
      autoLoadEntities: true,
      synchronize: true,
    };
  }
}
