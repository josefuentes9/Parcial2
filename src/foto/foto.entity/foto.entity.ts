import { AlbumEntity } from '../../album/album.entity/album.entity';
import { UsuarioEntity } from '../../usuario/usuario.entity/usuario.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FotoEntity {

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    iso: number;
   
    @Column()
    velObturacion: number;

    @Column()
    apertura: number;

    @Column()
    fecha: Date;

    @ManyToOne(() => UsuarioEntity, usuario => usuario.fotos)
    usuario: UsuarioEntity;
    @ManyToOne(() => AlbumEntity, album => album.fotos)
    album: AlbumEntity;
}
