import { Body, Controller, Post, Request } from '@nestjs/common';
import { User } from 'src/interfaces/file.interface';
import { ServicesService } from './services.service';
import * as jwt from 'jsonwebtoken';

@Controller('user')
export class ControllersController {
  constructor(private userService: ServicesService) {}

  @Post('login')
  async login(@Body() body) {
    return this.userService.login(body);
  }
}
