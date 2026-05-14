import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy'; // 1. Bunu ekledik
import { PassportModule } from '@nestjs/passport'; // 2. Güvenlik için bunu da ekleyelim

@Module({
  imports: [
    UsersModule,
    PassportModule, // 3. Passport entegrasyonu
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService, JwtStrategy], // 4. JwtStrategy buraya mutlaka girmeli!
  controllers: [AuthController],
  exports: [AuthService], // 5. Diğer modüllerin erişimi için dışarı açtık
})
export class AuthModule {}