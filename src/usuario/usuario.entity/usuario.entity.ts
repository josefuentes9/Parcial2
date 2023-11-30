import { Column, Entity, OneToMany, ManyToOne,PrimaryGeneratedColumn } from 'typeorm';
import { FotoEntity } from '../../foto/foto.entity/foto.entity';
import { RedsocialEntity } from '../../redsocial/redsocial.entity/redsocial.entity';
@Entity()
export class UsuarioEntity {

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    nombre: string;
   
    @Column()
    telefono: string;
    
    @OneToMany(() => FotoEntity, fotos => fotos.usuario)
    fotos: FotoEntity[];

    @ManyToOne(() => RedsocialEntity, redsocial => redsocial.usuarios)
    redsocial: RedsocialEntity;
}