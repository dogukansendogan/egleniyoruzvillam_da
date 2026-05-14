import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'super-gizli-villa-key-2026', // AuthModule'deki ile aynı olmalı
    });
  }

  async validate(payload: any) {
    // Bu metod, token geçerliyse çalışır ve döneceği veri 'req.user' içine eklenir
    return { userId: payload.sub, email: payload.email, role: payload.role };
  }
}