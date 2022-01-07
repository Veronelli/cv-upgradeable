import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { promisify } from 'util';
import { config } from 'dotenv';
import * as fs from 'fs';
import * as jwt from 'jsonwebtoken';
import { AppService } from '../app.service';
import { User } from 'src/interfaces/file.interface';

config();
@Injectable()
export class ServicesService {
  private salt = process.env.SALT;
  constructor(private appService: AppService) {}
  async login(body: User) {
    const { password, name } = body;
    const user: User = this.appService.readFile();
    if (name != user.name) {
      return;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return;
    }
    const payload = { name };
    return jwt.sign(payload, process.env.KEY, { expiresIn: '1h' });
  }
}
