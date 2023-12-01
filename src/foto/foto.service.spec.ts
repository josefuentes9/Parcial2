import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../../shared/testing-utils/typeorm-testing-config';
import { FotoEntity } from './foto.entity/foto.entity';
import { FotoService } from './foto.service';
import { faker } from '@faker-js/faker';

describe('FotoService', () => {
 let service: FotoService;
 let repository: Repository<FotoEntity>;
 let fotoList:FotoEntity[];

 beforeEach(async () => {
   const module: TestingModule = await Test.createTestingModule({
     imports: [...TypeOrmTestingConfig()],
     providers: [FotoService],
   }).compile();

   service = module.get<FotoService>(FotoService);
   repository = module.get<Repository<FotoEntity>>(getRepositoryToken(FotoEntity));
   await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    fotoList = [];
    for(let i = 0; i < 5; i++){
      const foto: FotoEntity = await repository.save({
        iso: faker.number.int(),
        velObturacion: faker.number.int(),
        apertura: faker.number.int(),
        fecha: faker.date.anytime()
      })
      fotoList.push(foto)
    }
  }
  
 it('should be defined', () => {
   expect(service).toBeDefined();
 });
 it('findAll should return all photos', async () => {
  const foto: FotoEntity[] = await service.buscarTodosLosFotos();
  expect(foto).not.toBeNull();
  });

  it('findOne should return a phoyo by id', async () => {
    const storedFoto: FotoEntity = fotoList[0];
    const foto: FotoEntity = await service.buscarFotoPorId(storedFoto.id);
    expect(foto).not.toBeNull();
    expect(foto.iso).toEqual(storedFoto.iso)
  });

  it('create should return a new photo', async () => {
    const foto: FotoEntity = {
      id: 0,
      iso: 6000,
      velObturacion: 400,
      apertura: 20,
      fecha: faker.date.anytime(),
      usuario: null,
      album: null
    }
    const newFoto: FotoEntity = await service.createFoto(foto);
    expect(newFoto).not.toBeNull();

    const storedFoto: FotoEntity = await repository.findOne({where: {id: newFoto.id}})
    expect(storedFoto).not.toBeNull();
    expect(storedFoto.iso).toEqual(newFoto.iso)
  });

  it('create should not create a photo', async () => {
    const foto: FotoEntity = {
      id: 0,
      iso: 0,
      velObturacion: 0,
      apertura: 0,
      fecha: faker.date.anytime(),
      usuario: null,
      album: null
    }
    await expect(() => service.createFoto(foto)).rejects.toHaveProperty("message", "No cumple con las restricciones")
  });

});