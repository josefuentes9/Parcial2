import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../../shared/testing-utils/typeorm-testing-config';
import { AlbumEntity } from './album.entity/album.entity';
import { AlbumService } from './album.service';
import { faker } from '@faker-js/faker';
import { FotoEntity } from '../foto/foto.entity/foto.entity';

describe('AlbumService', () => {
 let service: AlbumService;
 let repository: Repository<AlbumEntity>;
 let albumList: AlbumEntity[];

 beforeEach(async () => {
   const module: TestingModule = await Test.createTestingModule({
     imports: [...TypeOrmTestingConfig()],
     providers: [AlbumService],
   }).compile();

   service = module.get<AlbumService>(AlbumService);
   repository = module.get<Repository<AlbumEntity>>(getRepositoryToken(AlbumEntity));
   await seedDatabase();
  });

 const seedDatabase = async () => {
  repository.clear();
  albumList = [];
  for(let i = 0; i < 5; i++){
    const album: AlbumEntity = await repository.save({
      fechainicio: faker.date.past(),
      fechafin: faker.date.soon(), 
      titulo: faker.company.name(), 
    })
    albumList.push(album)
  }
}

 it('should be defined', () => {
   expect(service).toBeDefined();
 });

  it('findOne should return a user by id', async () => {
    const storedAlbum: AlbumEntity = albumList[0];
    const album: AlbumEntity = await service.findAlbumById(storedAlbum.id);
    expect(album).not.toBeNull();
    expect(album.titulo).toEqual(storedAlbum.titulo)
  });

  it('create should return a new album', async () => {
    const album: AlbumEntity = {
      id: 1,
      fechainicio: faker.date.past(),
      fechafin: faker.date.soon(), 
      titulo: faker.company.name(), 
      fotos: []
    }
    const newAlbum: AlbumEntity = await service.createAlbum(album);
    expect(newAlbum).not.toBeNull();

    const storedAlbum: AlbumEntity = await repository.findOne({where: {id: newAlbum.id}})
    expect(storedAlbum).not.toBeNull();
    expect(storedAlbum.titulo).toEqual(newAlbum.titulo)
  });

  it('create should not create a album', async () => {
    const album: AlbumEntity = {
      id: 1,
      fechainicio: faker.date.past(),
      fechafin: faker.date.soon(), 
      titulo: "", 
      fotos: []
    }
    await expect(() => service.createAlbum(album)).rejects.toHaveProperty("message", "The Album dont have a title")
  });

});