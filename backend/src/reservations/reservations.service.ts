import { ReservationStatus } from '@prisma/client';
import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReservationsService {
  constructor(private prisma: PrismaService) {}

  async findByUser(userId: string) {
    return this.prisma.reservation.findMany({
      where: {
        userId: userId,
      },
      include: {
        villa: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async createReservation(userId: string, data: any) {
    const { villaId, startDate, endDate } = data;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (start < today) {
      throw new BadRequestException('Geçmiş bir tarihe rezervasyon yapamazsınız.');
    }

    if (end <= start) {
      throw new BadRequestException('Çıkış tarihi, giriş tarihinden sonra olmalıdır.');
    }

    const conflicting = await this.prisma.reservation.findFirst({
      where: {
        villaId,
        status: { not: 'CANCELLED' },
        AND: [
          { startDate: { lt: end } },
          { endDate: { gt: start } },
        ],
      },
    });

    if (conflicting) {
      throw new BadRequestException('Seçilen tarihlerde villa dolu.');
    }

    const villa = await this.prisma.villa.findUnique({ where: { id: villaId } });
    if (!villa) {
      throw new BadRequestException('Villa bulunamadı.');
    }
    const diffDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24));
    const totalPrice = diffDays * villa.pricePerNight;

    return this.prisma.reservation.create({
      data: {
        startDate: start,
        endDate: end,
        totalPrice,
        status: 'REQUESTED',
        userId,
        villaId,
      },
    });
  }

  async cancelReservation(userId: string, reservationId: string) {
    const reservation = await this.prisma.reservation.findUnique({
      where: { id: reservationId },
    });

    if (!reservation || reservation.userId !== userId) {
      throw new BadRequestException('İptal edilecek rezervasyon bulunamadı veya yetkiniz yok.');
    }

    if (reservation.status === 'CANCELLED') {
      throw new BadRequestException('Bu rezervasyon zaten iptal edilmiş.');
    }

    return this.prisma.reservation.update({
      where: { id: reservationId },
      data: { status: 'CANCELLED' },
    });
  }

  // --- BURADAN SONRASI YENİ EKLENDİ (Admin İçin) ---

  // Sistemdeki tüm rezervasyonları villalarıyla birlikte getirir
  async findAll() {
    return this.prisma.reservation.findMany({
      include: {
        villa: true,
        // user: true, // Eğer kullanıcı adını da tabloda göstermek istersen burayı açabilirsin
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  // Adminin rezervasyon durumunu değiştirmesini sağlar (Onayla/İptal Et/Talep Olarak Bırak)
  async updateStatus(id: string, status: ReservationStatus) {
    const reservation = await this.prisma.reservation.findUnique({
      where: { id },
    });

    if (!reservation) {
      throw new BadRequestException('Güncellenmek istenen rezervasyon bulunamadı.');
    }

    return this.prisma.reservation.update({
      where: { id },
      data: { status },
    });
  }
}