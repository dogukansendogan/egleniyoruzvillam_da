import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { VillasModule } from './villas/villas.module';
import { ReservationsModule } from './reservations/reservations.module';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule, VillasModule, ReservationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
