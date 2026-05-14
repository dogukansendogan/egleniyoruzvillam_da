// backend/src/villas/villas.controller.ts
import { Controller, Get, Post, Patch, Param, Body } from '@nestjs/common';
import { VillasService } from './villas.service';

@Controller('villas')
export class VillasController {
  constructor(private readonly villasService: VillasService) {}

  // Tüm villaları listeler (GET /villas)
  @Get()
  async findAll() {
    return this.villasService.findAll();
  }

  // Villa detayını getirir (GET /villas/:id)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.villasService.findOne(id);
  }

  // Yeni villa ekler (POST /villas)
  @Post()
  async create(@Body() body: any) {
    return this.villasService.create(body);
  }

  // Gerekirse villayı güncellemek veya pasife çekmek için (PATCH /villas/:id)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateData: any) {
    // Bu metod için servise 'update' fonksiyonu eklenebilir
    return this.villasService.update(id, updateData);
  }
}