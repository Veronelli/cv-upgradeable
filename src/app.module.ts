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

@Module({
  imports: [CurriculumModule, UsuarioModule],
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
