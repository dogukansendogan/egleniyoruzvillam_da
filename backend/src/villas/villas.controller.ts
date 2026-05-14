import { Controller, Get, Post, Patch, Param, Body } from '@nestjs/common';
import { VillasService } from './villas.service';

@Controller('villas')
export class VillasController {
  constructor(private readonly villasService: VillasService) {}

  // Tüm villaları listelemek için (GET /villas)
  @Get()
  getAllVillas() {
    return this.villasService.findAll();
  }

  // Yeni villa eklemek için (POST /villas) - Senin çalıştırdığın curl buraya gelecek
  @Post()
  createVilla(@Body() body: any) {
    return this.villasService.create(body);
  }

  // Villa detayını görmek için (GET /villas/:id)
  @Get(':id')
  getVillaById(@Param('id') id: string) {
    return this.villasService.findOne(id);
  }
  @Get()
    async findAll() {
    return this.villasService.findAll();
}
}