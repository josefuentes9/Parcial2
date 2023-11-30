import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FotoModule } from './foto/foto.module';
import { UsuarioModule } from './usuario/usuario.module';
import { RedsocialModule } from './redsocial/redsocial.module';
import { AlbumModule } from './album/album.module';
import { RedsocialEntity } from './redsocial/redsocial.entity/redsocial.entity';
import { AlbumEntity } from './album/album.entity/album.entity';
import { UsuarioEntity } from './usuario/usuario.entity/usuario.entity';
import { FotoEntity } from './foto/foto.entity/foto.entity';

@Module({
  imports: [RedsocialModule, AlbumModule, UsuarioModule, FotoModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'redsocial',
      entities: [RedsocialEntity, AlbumEntity, UsuarioEntity, FotoEntity],
      dropSchema: true,
      synchronize: true,
      keepConnectionAlive: true
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
