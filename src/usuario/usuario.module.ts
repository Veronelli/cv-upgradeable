import { Module } from '@nestjs/common';
import { ControllersController } from './controllers.controller';
import { ServicesService } from './services.service';
import { AppService } from '../app.service';

@Module({
  controllers: [ControllersController],
  providers: [ServicesService, AppService],
})
export class UsuarioModule {}
