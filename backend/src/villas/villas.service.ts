import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class VillasService {
  constructor(private prisma: PrismaService) {}

  // 1. findAll fonksiyonu (Hata 1'i çözer)
  async findAll() {
    return this.prisma.villa.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  // 2. findOne fonksiyonu (Hata 3'ü çözer)
  async findOne(id: string) {
    const villa = await this.prisma.villa.findUnique({
      where: { id },
      include: { reservations: true },
    });
    if (!villa) throw new NotFoundException('Villa bulunamadı.');
    return villa;
  }
  

  // 3. create fonksiyonu (Hata 2'yi çözer)
  async create(data: any) {
    return this.prisma.villa.create({
      data: {
        name: data.name,
        description: data.description,
        pricePerNight: data.pricePerNight,
      },
    });
  }
}