import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { FotoService } from './foto.service';
import { FotoEntity } from './foto.entity/foto.entity';
import { FotoDto } from './foto.dto/foto.dto';
import { BusinessErrorsInterceptor } from '../../shared/interceptors/business-errors/business-errors.interceptor';
import { plainToInstance } from 'class-transformer';

@Controller('foto')
@UseInterceptors(BusinessErrorsInterceptor)
export class FotoController {

    constructor(private readonly fotoService: FotoService) {}

    @Get()
    async buscarTodosLosFotos() {
      return await this.fotoService.buscarTodosLosFotos();
    }
  
    @Get(':fotoId')
    async buscarFotoPorId(@Param('fotoId') fotoId: number) {
      return await this.fotoService.buscarFotoPorId(fotoId);
    }
  
    @Post()
    async crearFoto(@Body() fotoDto: FotoDto) {
      const foto: FotoEntity = plainToInstance(FotoEntity, fotoDto);
      return await this.fotoService.createFoto(foto);
    }
  

}
