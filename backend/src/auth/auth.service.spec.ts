import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async login(email: string, pass: string) {
    // 1. Email'e göre kullanıcıyı bul
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Kullanıcı bulunamadı veya şifre hatalı.');
    }

    // 2. Şifre eşleşiyor mu kontrol et
    const isPasswordMatching = await bcrypt.compare(pass, user.password);
    if (!isPasswordMatching) {
      throw new UnauthorizedException('Kullanıcı bulunamadı veya şifre hatalı.');
    }

    // 3. Token içine gömülecek verileri (Payload) hazırla
    const payload = { sub: user.id, email: user.email, role: user.role };
    
    // 4. Token'ı oluştur ve kullanıcı bilgileriyle birlikte geri dön
    return {
      access_token: await this.jwtService.signAsync(payload),
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role
      }
    };
  }
}