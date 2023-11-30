import { Injectable } from '@nestjs/common';
import { FotoEntity } from './foto.entity/foto.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessLogicException, BusinessError } from 'shared/business-errors';
import { AlbumEntity } from 'src/album/album.entity/album.entity';

@Injectable()
export class FotoService {
  constructor(
    @InjectRepository(FotoEntity)
    private readonly fotoRepository: Repository<FotoEntity>,

    @InjectRepository(AlbumEntity)
    private readonly albumRepository: Repository<AlbumEntity>,
  ) {}

  async buscarTodosLosFotos(): Promise<FotoEntity[]> {
    return await this.fotoRepository.find();
  }

  async buscarFotoPorId(id: number): Promise<FotoEntity> {
    const foto: FotoEntity = await this.fotoRepository.findOne({
      where: { id },
    });
    if (!foto)
      throw new BusinessLogicException(
        'The museum with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    return foto;
  }

  async createFoto(foto: FotoEntity): Promise<FotoEntity> {
    let contador = 0;
    if (foto.iso >= 100 && foto.iso >= 6400) {
      if (foto.velObturacion >= 2 && foto.velObturacion <= 500) {
        if (foto.apertura >= 2 && foto.apertura <= 32) {
            if(foto.iso>=(6400-100)/2){
                contador++;
            }
            if(foto.velObturacion>=(500-2)/2){
                contador++;
            }
            if(foto.velObturacion>=(32-2)/2){
                contador++;
            }
          if (contador >= 2) {
            return await this.fotoRepository.save(foto);
          }
        }
      }
    } else {
      throw new BusinessLogicException(
        'No cumple con las restricciones',
        BusinessError.BAD_REQUEST,
      );
    }
  }

  async deleteFoto(id: number, album: AlbumEntity) {
    const foto: FotoEntity = await this.fotoRepository.findOne({
      where: { id },
    });
    if (album.fotos.length == 0) {
      await this.fotoRepository.remove(foto);
      await this.albumRepository.remove(album);
    }
  }
}
