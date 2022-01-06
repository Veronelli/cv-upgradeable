import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { FileDTO, File } from '../interfaces/file.interface';

@Injectable()
export class CurriculumService {
  fileData!: FileDTO;
  public file!: File;

  create(body: FileDTO, path: string, fileName: string): string {
    const today = new Date();
    this.file = {
      name: body.name,
      version: body.version,
      description: body.description,
      path,
      fileName,
      createdAt: `${today.getDate()}/${
        today.getMonth() + 1
      }/${today.getFullYear()}`,
    };
    fs.writeFileSync('./file/info.json', JSON.stringify(this.file));
    console.log(this.file);
    return 'New Curriculum created';
  }

  readFile(): File {
    return JSON.parse(fs.readFileSync('./file/info.json', 'utf-8'));
  }
}
