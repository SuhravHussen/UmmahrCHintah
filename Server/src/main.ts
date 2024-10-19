import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import './config/instrument';
import { ValidationPipe } from '@nestjs/common';
import type { FastifyCookieOptions } from '@fastify/cookie';
import cookie from '@fastify/cookie';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.enableCors({
    origin: ['http://localhost:3001', 'https://ummahrchintah.vercel.app'],
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: '*',
    credentials: true,
  });
  app.register(cookie) as FastifyCookieOptions;
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());

  app.setGlobalPrefix('v1');
  await app.listen(3000);
}
bootstrap();
