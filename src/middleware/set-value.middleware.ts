import {
  Body,
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction } from 'express';
import { FileDTO } from '../interfaces/file.interface';
import * as jwt from 'jsonwebtoken';
import { AppService } from '../app.service';
import { config } from 'dotenv';
import { User } from '../interfaces/file.interface';
config();
@Injectable()
export class SetValueMiddleware implements NestMiddleware {
  constructor(private appService: AppService) {}
  use(req: any, res: any, next: NextFunction) {
    const token = req.headers.token;
    try {
      const decode: any = jwt.verify(token, process.env.KEY);
      const user: User = this.appService.readFile();
      if (decode.name != user.name) {
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
      }
      next();
    } catch (e) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }
}
