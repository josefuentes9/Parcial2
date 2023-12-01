import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from '../../src/usuario/usuario.entity/usuario.entity';
import { AlbumEntity } from '../../src/album/album.entity/album.entity';
import { FotoEntity } from '../../src/foto/foto.entity/foto.entity';
import { RedsocialEntity } from '../../src/redsocial/redsocial.entity/redsocial.entity';

export const TypeOrmTestingConfig = () => [
 TypeOrmModule.forRoot({
   type: 'sqlite',
   database: ':memory:',
   dropSchema: true,
   entities: [FotoEntity, AlbumEntity, UsuarioEntity, RedsocialEntity],
   synchronize: true,
   keepConnectionAlive: true
 }),
 TypeOrmModule.forFeature([FotoEntity, AlbumEntity, UsuarioEntity, RedsocialEntity]),
];