/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { FotoEntity } from '../foto/foto.entity/foto.entity';
import { Repository } from 'typeorm';
import { AlbumEntity } from '../album/album.entity/album.entity';
import { TypeOrmTestingConfig } from '../../shared/testing-utils/typeorm-testing-config';
import { AlbumFotoService } from './album-foto.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';

describe('AlbumFotoService', () => {
  let service: AlbumFotoService;
  let albumRepository: Repository<AlbumEntity>;
  let fotoRepository: Repository<FotoEntity>;
  let album: AlbumEntity;
  let fotosList : FotoEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [AlbumFotoService],
    }).compile();

    service = module.get<AlbumFotoService>(AlbumFotoService);
    albumRepository = module.get<Repository<AlbumEntity>>(getRepositoryToken(AlbumEntity));
    fotoRepository = module.get<Repository<FotoEntity>>(getRepositoryToken(FotoEntity));

    await seedDatabase();
  });

  const seedDatabase = async () => {
    fotoRepository.clear();
    albumRepository.clear();

    fotosList = [];
    for(let i = 0; i < 5; i++){
        const foto: FotoEntity = await fotoRepository.save({ 
          iso: faker.number.int(),
          velObturacion: faker.number.int(),
          apertura: faker.number.int(),
          fecha: faker.date.anytime()
        })
        fotosList.push(foto);
    }

    const albums = await albumRepository.save({
      fechainicio: faker.date.past(),
      fechafin: faker.date.soon(), 
      titulo: faker.company.name(), 
      fotos: fotosList
    })
    album = albums
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('addFotoAlbum should add an foto to a album', async () => {
    const newFoto: FotoEntity = await fotoRepository.save({
      iso: faker.number.int(),
      velObturacion: faker.number.int(),
      apertura: faker.number.int(),
      fecha: faker.date.anytime()
    });
 
    const newAlbum: AlbumEntity = await albumRepository.save({
      fechainicio: faker.date.past(),
      fechafin: faker.date.soon(), 
      titulo: faker.company.name(), 

    })
 
    const result: AlbumEntity = await service.addFotoAlbum(newAlbum.id, newFoto.id);
   
    expect(result.fotos.length).toBe(1);
    expect(result.fotos[0]).not.toBeNull();
  });
})