import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioEntity } from './usuario.entity/usuario.entity';
import { UsuarioDto } from './usuario.dto/usuario.dto';
import { BusinessErrorsInterceptor } from '../../shared/interceptors/business-errors/business-errors.interceptor';
import { plainToInstance } from 'class-transformer';

@Controller('usuario')
@UseInterceptors(BusinessErrorsInterceptor)
export class UsuarioController {

    constructor(private readonly usuarioService: UsuarioService) {}

    @Get()
    async buscarTodosLosUsuarios() {
      return await this.usuarioService.buscarTodosLosUsuarios();
    }
  
    @Get(':usuarioId')
    async buscarUsuarioPorId(@Param('usuarioId') usuarioId: number) {
      return await this.usuarioService.buscarUsuarioPorId(usuarioId);
    }
  
    @Post()
    async crearUsuario(@Body() usuarioDto: UsuarioDto) {
      const usuario: UsuarioEntity = plainToInstance(UsuarioEntity, usuarioDto);
      return await this.usuarioService.crearUsuario(usuario);
    }
  

}
