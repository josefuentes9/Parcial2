import { Body, Controller, Delete, Get, HttpCode, Param, Post, UseInterceptors } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumEntity } from './album.entity/album.entity';
import { AlbumDto } from './album.dto/album.dto';
import { BusinessErrorsInterceptor } from '../../shared/interceptors/business-errors/business-errors.interceptor';
import { plainToInstance } from 'class-transformer';

@Controller('album')
@UseInterceptors(BusinessErrorsInterceptor)
export class AlbumController {

    constructor(private readonly albumService: AlbumService) {}

  
    @Get(':albumId')
    async buscarAlbumPorId(@Param('albumId') albumId: number) {
      return await this.albumService.findAlbumById(albumId);
    }
  
    @Post()
    async crearAlbum(@Body() albumDto: AlbumDto) {
      const album: AlbumEntity = plainToInstance(AlbumEntity, albumDto);
      return await this.albumService.createAlbum(album);
    }

    @Delete(':albumId')
    @HttpCode(204)
    async delete(@Param('albumId') albumId: number) {
      return await this.albumService.deleteAlbum(albumId);
    }
  
  

}
