import { Inject, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { Repository } from 'typeorm';
import { FileDTO, IFile } from '../interfaces/file.interface';
import { File } from './file.entity';

@Injectable()
export class CurriculumService {
  fileData!: FileDTO;
  public file!: IFile;

  constructor(
    @Inject('FILE_REPOSITORY')
    private fileRepository: Repository<File>,
  ) {}

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

  async findAll(): Promise<File[]> {
    return this.fileRepository.find();
  }

  readFile(): IFile {
    return JSON.parse(fs.readFileSync('./file/info.json', 'utf-8'));
  }
}
