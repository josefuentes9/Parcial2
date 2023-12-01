import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../../shared/testing-utils/typeorm-testing-config';
import { RedsocialEntity } from './redsocial.entity/redsocial.entity';
import { RedsocialService } from './redsocial.service';
import { faker } from '@faker-js/faker';

describe('RedsocialService', () => {
 let service: RedsocialService;
 let repository: Repository<RedsocialEntity>;
 let redsocialList: RedsocialEntity[];

 beforeEach(async () => {
   const module: TestingModule = await Test.createTestingModule({
     imports: [...TypeOrmTestingConfig()],
     providers: [RedsocialService],
   }).compile();

   service = module.get<RedsocialService>(RedsocialService);
   repository = module.get<Repository<RedsocialEntity>>(getRepositoryToken(RedsocialEntity));
   await seedDatabase();
  });

 const seedDatabase = async () => {
  repository.clear();
  redsocialList = [];
  for(let i = 0; i < 1; i++){
    const redsocial: RedsocialEntity = await repository.save({
      nombre: faker.person.firstName(),
      slogan: "aasbdjkluklwgkjqbklqgkwbjhvq",
    })
    redsocialList.push(redsocial)
  }
}
  
 it('should be defined', () => {
   expect(service).toBeDefined();
 });

 it('create should return a Red social', async () => {
  const newRedsocial: RedsocialEntity = await service.crearRedsocial(redsocialList[0]);
  expect(newRedsocial).not.toBeNull();

  const storedRedsocial: RedsocialEntity = await repository.findOne({where: {id: newRedsocial.id}})
  expect(storedRedsocial).not.toBeNull();
  expect(storedRedsocial.nombre).toEqual(newRedsocial.nombre)
});

it('create should not create a RedSocial', async () => {
  const redsocial: RedsocialEntity = {
    id: 0,
    nombre: faker.person.firstName(),
    slogan: "aasbd",
    usuarios: []
  }
  await expect(() => service.crearRedsocial(redsocial)).rejects.toHaveProperty("message", "No cumple con las restricciones")
});
});