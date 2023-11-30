import { FotoEntity } from '../../foto/foto.entity/foto.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AlbumEntity {

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    fechainicio: Date;
   
    @Column()
    fechafin: Date;

    @Column()
    titulo: string;

    @OneToMany(() => FotoEntity, fotos => fotos.album)
    fotos: FotoEntity[];
}