import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { QueryFailedExceptionFilter } from './exceptions/database.exception';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // getting configService from application
  // to fetch port from app.config.ts config load
  const configService = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalFilters(new QueryFailedExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('meta-referrals-api')
    .setDescription('API for exchange link referrals')
    .setVersion('1.0')
    .addTag('meta')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-doc', app, document);

  await app.listen(configService.get('app.port') ?? 3010);
}
bootstrap();
