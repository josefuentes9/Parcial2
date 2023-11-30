import { Injectable } from '@nestjs/common';
import { AlbumEntity } from '../album/album.entity/album.entity';
import { FotoEntity } from '../foto/foto.entity/foto.entity';
import { Repository } from 'typeorm';
import { BusinessLogicException, BusinessError } from 'shared/business-errors';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AlbumFotoService {
    constructor(
        @InjectRepository(AlbumEntity)
        private readonly albumRepository: Repository<AlbumEntity>,
    
        @InjectRepository(FotoEntity)
        private readonly fotoRepository: Repository<FotoEntity>
    ) {}

    async addFotoAlbum(albumId: number, fotoId: number): Promise<AlbumEntity> {
        const foto: FotoEntity = await this.fotoRepository.findOne({where: {id: fotoId}});
        if (!foto)
          throw new BusinessLogicException("The foto with the given id was not found", BusinessError.NOT_FOUND);
      
        const album: AlbumEntity = await this.albumRepository.findOne({where: {id: albumId}, relations: ["fotos", "exhibitions"]})
        if (!album)
          throw new BusinessLogicException("The album with the given id was not found", BusinessError.NOT_FOUND);
        
        if(foto.fecha.getDate<=album.fechafin.getDate &&foto.fecha.getDate>=album.fechainicio.getDate )
           album.fotos = [...album.fotos, foto];
        return await this.albumRepository.save(album);
      }
}
