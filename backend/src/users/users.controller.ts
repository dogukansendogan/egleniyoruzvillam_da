import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() body: any) {
    // Gelen veriyi (email, password, fullName) UsersService'e gönderir
    return this.usersService.createUser(body);
  }
}