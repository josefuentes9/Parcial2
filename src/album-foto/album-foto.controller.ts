import {
  Controller,
  Delete,
  HttpCode,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../../shared/interceptors/business-errors/business-errors.interceptor';
import { AlbumFotoService } from './album-foto.service';

@Controller('album')
@UseInterceptors(BusinessErrorsInterceptor)
export class AlbumFotoController {

  constructor(private readonly albumFotoService: AlbumFotoService) {}

  @Post(':albumId/fotos/:fotoId')
  async addFotoAlbum(
    @Param('albumId') albumId: number,
    @Param('fotoId') fotoId: number,
  ) {
    return await this.albumFotoService.addFotoAlbum(albumId, fotoId);
  }

  @Delete(':albumId/fotos/:fotoId')
  @HttpCode(204)
  async deleteFotoAlbum(
    @Param('albumId') albumId: number,
    @Param('fotoId') fotoId: number,
  ) {
    return await this.albumFotoService.deleteFoto(albumId, fotoId);
  }
}
