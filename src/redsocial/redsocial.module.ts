import { Module } from '@nestjs/common';
import { RedsocialService } from './redsocial.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedsocialEntity } from './redsocial.entity/redsocial.entity';
@Module({
  imports: [TypeOrmModule.forFeature([RedsocialEntity])],
  providers: [RedsocialService]
})
export class RedsocialModule {}
