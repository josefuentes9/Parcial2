import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { RedsocialService } from './redsocial.service';
import { RedsocialEntity } from './redsocial.entity/redsocial.entity';
import { RedsocialDto } from './redsocial.dto/redsocial.dto';
import { BusinessErrorsInterceptor } from '../../shared/interceptors/business-errors/business-errors.interceptor';
import { plainToInstance } from 'class-transformer';

@Controller('redsocial')
@UseInterceptors(BusinessErrorsInterceptor)
export class RedsocialController {

    constructor(private readonly redsocialService: RedsocialService) {}

    @Post()
    async crearRedsocial(@Body() redsocialDto: RedsocialDto) {
      const redsocial: RedsocialEntity = plainToInstance(RedsocialEntity, redsocialDto);
      return await this.redsocialService.crearRedsocial(redsocial);
    }
  

}