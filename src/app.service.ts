import { Injectable } from '@nestjs/common';
import { User } from './interfaces/file.interface';
import * as fs from 'fs';

@Injectable()
export class AppService {
  readFile(): User {
    return JSON.parse(fs.readFileSync('./file/user.json', 'utf-8'));
  }
  getHello(): string {
    return 'Hello World!';
  }
}
