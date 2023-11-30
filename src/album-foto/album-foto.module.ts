import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from 'src/album/album.entity/album.entity';
import { AlbumService } from 'src/album/album.service';

@Module({
 imports: [TypeOrmModule.forFeature([AlbumEntity])],
 providers: [AlbumService],
})
export class AlbumFotoModule {}