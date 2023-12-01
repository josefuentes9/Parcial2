import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessLogicException, BusinessError } from '../../shared/business-errors';
import { AlbumEntity } from './album.entity/album.entity';

@Injectable()
export class AlbumService {
    constructor(
    @InjectRepository(AlbumEntity)
    private readonly albumRepository: Repository<AlbumEntity>,
    ){}

async findAlbumById(id: number): Promise<AlbumEntity> {
    const album: AlbumEntity = await this.albumRepository.findOne( {where: {id} } );
    if(album !=null){
        return album;
    }
    else{
        throw new BusinessLogicException("The museum with the given id was not found", BusinessError.NOT_FOUND);
    }
}

async createAlbum(album: AlbumEntity): Promise<AlbumEntity> {
    if(album.titulo !== ""){
        return await this.albumRepository.save(album);
    }
    else{
        throw new BusinessLogicException("The Album dont have a title", BusinessError.BAD_REQUEST);
    }

}

async deleteAlbum(id: number) {
    const album: AlbumEntity = await this.albumRepository.findOne({where:{id}});
    if(album.fotos == null){
    await this.albumRepository.remove(album);
    }
    else{
        throw new BusinessLogicException("El album no esta disponible", BusinessError.PRECONDITION_FAILED);
    }
}
}
