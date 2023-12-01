import { Module } from '@nestjs/common';
import { FotoService } from './foto.service';
import { FotoEntity } from './foto.entity/foto.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FotoController } from './foto.controller';
@Module({
  imports: [TypeOrmModule.forFeature([FotoEntity])],
  providers: [FotoService],
  controllers: [FotoController]
})
export class FotoModule {}
