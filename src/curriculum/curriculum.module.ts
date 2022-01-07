import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { databaseProviders } from 'src/database/db.providers';
import { CurriculumController } from './curriculum.controller';
import { CurriculumService } from './curriculum.service';
import { fileProviders } from './file.providers';

@Module({
  controllers: [CurriculumController],
  imports: [DatabaseModule],
  providers: [CurriculumService, ...fileProviders],
})
export class CurriculumModule {}
