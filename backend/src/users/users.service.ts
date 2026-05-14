import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // Yeni Kullanıcı Kaydetme
  async createUser(data: any) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new ConflictException('Bu email adresi zaten kullanımda.');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newUser = await this.prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        fullName: data.name || "İsimsiz Kullanıcı" ,
        role: 'USER'
      },
    });

    const { password, ...result } = newUser;
    return result;
  }

  // Email'e Göre Kullanıcı Bulma
  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }
}