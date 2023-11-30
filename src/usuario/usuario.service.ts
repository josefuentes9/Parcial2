import { Injectable } from '@nestjs/common';
import { UsuarioEntity } from './usuario.entity/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessLogicException, BusinessError } from 'shared/business-errors';

@Injectable()
export class UsuarioService{

    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepository: Repository<UsuarioEntity>,
        ){}

    async buscarTodosLosUsuarios(): Promise<UsuarioEntity[]> {
        return await this.usuarioRepository.find();
    }

    async buscarUsuarioPorId(id: number): Promise<UsuarioEntity> {
        const usuario: UsuarioEntity = await this.usuarioRepository.findOne( {where: {id} } );
        return usuario;
    }

    async crearUsuario(usuario: UsuarioEntity): Promise<UsuarioEntity> {
        if(usuario.telefono.length == 10){
          return await this.usuarioRepository.save(usuario);
        }
        else{
          throw new BusinessLogicException("The book has an invalid name or description", BusinessError.BAD_REQUEST);
        }
    }

}
