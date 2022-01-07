import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CurriculumModule } from './curriculum/curriculum.module';
import { SetValueMiddleware } from './middleware/set-value.middleware';
import { UsuarioModule } from './usuario/usuario.module';
import { ControllersController } from './usuario/controllers.controller';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { databaseProviders } from './database/db.providers';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [CurriculumModule, UsuarioModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SetValueMiddleware)
      .forRoutes({ path: 'curriculum/upload', method: RequestMethod.POST });
  }
}
