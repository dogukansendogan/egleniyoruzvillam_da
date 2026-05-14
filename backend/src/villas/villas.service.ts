// backend/src/villas/villas.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class VillasService {
  constructor(private prisma: PrismaService) {}

  // Tüm aktif villaları getirir
  async findAll() {
    return this.prisma.villa.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  // ID'ye göre tekil villa ve rezervasyonlarını getirir
  async findOne(id: string) {
    const villa = await this.prisma.villa.findUnique({
      where: { id },
      include: { reservations: true },
    });
    if (!villa) throw new NotFoundException('Villa bulunamadı.');
    return villa;
  }

  // Yeni Villa Ekleme
  async create(data: any) {
    return this.prisma.villa.create({
      data: {
        name: data.name,
        description: data.description|| "Harika bir tatil villası.",
        location: data.location,
        pricePerNight: parseFloat(data.pricePerNight),
        capacity: data.capacity || 2,
        bedrooms: data.bedrooms || 1,
        bathrooms: data.bathrooms || 1,
        imageUrl: data.imageUrl || 'https://via.placeholder.com/800',
        features: data.features || [],
        isActive: true,
      },
    });
  }

  // Buraya 'update' metodunu ekledim:
  async update(id: string, data: any) {
    // Önce villanın var olup olmadığını kontrol edelim
    const existingVilla = await this.prisma.villa.findUnique({ where: { id } });
    
    if (!existingVilla) {
      throw new NotFoundException('Güncellenmek istenen villa bulunamadı.');
    }

    return this.prisma.villa.update({
      where: { id },
      data: {
        name: data.name ?? existingVilla.name,
        description: data.description ?? existingVilla.description,
        location: data.location ?? existingVilla.location,
        pricePerNight: data.pricePerNight ? parseFloat(data.pricePerNight) : existingVilla.pricePerNight,
        capacity: data.capacity ?? existingVilla.capacity,
        bedrooms: data.bedrooms ?? existingVilla.bedrooms,
        bathrooms: data.bathrooms ?? existingVilla.bathrooms,
        imageUrl: data.imageUrl ?? existingVilla.imageUrl,
        features: data.features ?? existingVilla.features,
        isActive: data.isActive ?? existingVilla.isActive,
      },
    });
  }
}