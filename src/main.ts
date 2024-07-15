import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { QueryFailedExceptionFilter } from './exceptions/database.exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // getting configService from application
  // to fetch port from app.config.ts config load
  const configService = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  // app.useGlobalFilters([new HttpExceptionFilter()]);
  app.useGlobalFilters(new QueryFailedExceptionFilter());
  await app.listen(configService.get('app.port') ?? 3010);
}
bootstrap();
