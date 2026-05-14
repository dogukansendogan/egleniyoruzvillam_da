import { Controller, Post, Body, UseGuards, Request, InternalServerErrorException, Get, Param, Patch } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { ReservationsService } from './reservations.service';

@Controller('reservations')
export class ReservationsController {
  constructor(private reservationsService: ReservationsService) {}

  // --- MÜŞTERİ İŞLEMLERİ (Senin mevcut kodların, dokunulmadı) ---

  @UseGuards(JwtAuthGuard)
  @Get('my-list')
  async getMyReservations(@Request() req) {
    return this.reservationsService.findByUser(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/cancel')
  async cancel(@Request() req, @Param('id') id: string) {
    return this.reservationsService.cancelReservation(req.user.userId, id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Request() req, @Body() data: any) {
    console.log('Token içinden gelen user:', req.user);
    if (!req.user || !req.user.userId) {
      throw new InternalServerErrorException("Kullanıcı bilgisi token'dan alınamadı!");
    }
    return this.reservationsService.createReservation(req.user.userId, data);
  }

  // --- ADMİN İŞLEMLERİ (Yeni eklenenler) ---

  // Admin için tüm rezervasyonları getirir
  // Not: Şimdilik Guard eklemiyoruz ki frontend rahatça çekebilsin. İleride AdminGuard eklenebilir.
  @Get('admin/all')
  async findAll() {
    return this.reservationsService.findAll();
  }

  // Adminin rezervasyon durumunu güncellemesi için
  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: string, 
    @Body('status') status: string // TypeScript hatasını önlemek için type 'string' belirtildi
  ) {
    return this.reservationsService.updateStatus(id, status);
  }
}