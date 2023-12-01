import { UsuarioEntity } from '../../usuario/usuario.entity/usuario.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RedsocialEntity {

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    nombre: string;
   
    @Column()
    slogan: string;

    @OneToMany(() => UsuarioEntity, usuarios => usuarios.redsocial)
    usuarios: UsuarioEntity[];
}
