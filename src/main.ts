import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use('/public', express.static(join(__dirname, '..', 'file', 'cv')));
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
