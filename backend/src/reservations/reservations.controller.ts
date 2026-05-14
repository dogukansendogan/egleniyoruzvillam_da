import { Controller, Post, Body, UseGuards, Request, InternalServerErrorException, Get, Param , Patch} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.auth.guard'; // Bunu da oluşturacağız
import { ReservationsService } from './reservations.service';

@Controller('reservations')
export class ReservationsController {
  constructor(private reservationsService: ReservationsService) {}
    @UseGuards(JwtAuthGuard) // Yine kapıya güvenliği diktik
    @Get('my-list') // URL: GET /reservations/me/list
    async getMyReservations(@Request() req) {
  // Token'dan gelen userId'yi servise paslıyoruz
        return this.reservationsService.findByUser(req.user.userId);
}
    @UseGuards(JwtAuthGuard)
    @Patch(':id/cancel') // URL: PATCH /reservations/id-buraya/cancel
    async cancel(@Request() req, @Param('id') id: string) {
        return this.reservationsService.cancelReservation(req.user.userId, id);
}
  @UseGuards(JwtAuthGuard) // Kapıya güvenlik görevlisini diktik!
  @Post()
  async create(@Request() req, @Body() data: any) {
    // Artık userId'yi body'den değil, token'dan (req.user) alıyoruz!
    console.log('Token içinden gelen user:' , req.user);
    if (!req.user || !req.user.userId) {
    throw new InternalServerErrorException('Kullanıcı bilgisi token\'dan alınamadı!');
  }
    return this.reservationsService.createReservation(req.user.userId, data);
  }
}