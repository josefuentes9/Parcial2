import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessLogicException, BusinessError } from '../../shared/business-errors';
import { RedsocialEntity } from './redsocial.entity/redsocial.entity';
@Injectable()
export class RedsocialService {
  constructor(
    @InjectRepository(RedsocialEntity)
    private readonly redsocialRepository: Repository<RedsocialEntity>,
  ) {}

  async crearRedsocial(redsocial: RedsocialEntity): Promise<RedsocialEntity> {
    if (redsocial.slogan !== "" && redsocial.slogan.length >= 20) {
      return await this.redsocialRepository.save(redsocial);
    } else {
      throw new BusinessLogicException(
        'No cumple con las restricciones',
        BusinessError.BAD_REQUEST,
      );
    }
  }
}
