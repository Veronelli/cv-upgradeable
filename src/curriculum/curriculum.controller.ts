import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Request,
  Response,
  StreamableFile,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { CurriculumService } from './curriculum.service';
import * as fs from 'fs';
import {
  FileInterceptor,
  MulterModule,
  MulterModuleOptions,
  MulterOptionsFactory,
} from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { create } from 'domain';
import { AppService } from '../app.service';
import { File, FileDTO } from '../interfaces/file.interface';
import { join, extname } from 'path';

@Controller('curriculum')
export class CurriculumController {
  constructor(private readonly appService: CurriculumService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './file/cv',
        filename: function (req, file, cb) {
          console.log(req.body);
          const deletePath: File = JSON.parse(
            fs.readFileSync('./file/info.json', 'utf-8'),
          );
          if (fs.existsSync(deletePath.path)) {
            fs.unlinkSync(deletePath.path);
          } else {
            console.log('No se pudo encontrar');
          }
          cb(null, 'cv-' + req.body.version + '-' + file.originalname);
        },
      }),
      fileFilter: function (req, file, callback) {
        const ext = extname(file.originalname);
        console.log(ext);
        if (ext !== '.pdf') {
          return callback(new Error('Only images are allowed'), false);
        }
        callback(null, true);
      },
    }),
  )
  async upload(
    @Body() body: FileDTO,
    @UploadedFile() file: Express.Multer.File,
  ) {
    //--------------------------- Function ----------------------
    console.log(file);
    const path: string = './' + file.path;
    const fileName: string = file.filename;

    this.appService.create(body, path, fileName);
    return 'Hello';
  }

  @Get('last-version')
  lastVersion() {
    return this.appService.readFile();
  }

  @Get('download-file')
  downloadFile(@Response({ passthrough: true }) res): StreamableFile {
    const { fileName, path } = this.appService.readFile();
    console.log(fileName);
    const file = fs.createReadStream(
      join(process.cwd(), 'file', 'cv', fileName),
    );
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${fileName}"`,
    });
    return new StreamableFile(file);
  }
}
