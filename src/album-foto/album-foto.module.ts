import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from '../album/album.entity/album.entity';
import { AlbumService } from 'src/album/album.service';
import { AlbumFotoService } from './album-foto.service';
import { AlbumFotoController } from './album-foto.controller';
import { FotoEntity } from '../foto/foto.entity/foto.entity';

@Module({
 imports: [TypeOrmModule.forFeature([AlbumEntity, FotoEntity])],
 providers: [AlbumFotoService, AlbumService],
 controllers: [AlbumFotoController],
})
export class AlbumFotoModule {}