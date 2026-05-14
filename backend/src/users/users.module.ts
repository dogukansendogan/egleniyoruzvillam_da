import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService], // KRİTİK: Diğer modüllerin (Auth gibi) buna erişmesi için şart
})
export class UsersModule {}