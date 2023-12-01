import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../../shared/testing-utils/typeorm-testing-config';
import { UsuarioEntity } from '../../src/usuario/usuario.entity/usuario.entity';
import { UsuarioService } from './usuario.service';
import { faker } from '@faker-js/faker';


describe('UsuarioService', () => {
 let service: UsuarioService;
 let repository: Repository<UsuarioEntity>;
 let usuarioList: UsuarioEntity[];

 beforeEach(async () => {
   const module: TestingModule = await Test.createTestingModule({
     imports: [...TypeOrmTestingConfig()],
     providers: [UsuarioService],
   }).compile();

   service = module.get<UsuarioService>(UsuarioService);
   repository = module.get<Repository<UsuarioEntity>>(getRepositoryToken(UsuarioEntity));
   await seedDatabase();
  });

 const seedDatabase = async () => {
  repository.clear();
  usuarioList = [];
  for(let i = 0; i < 5; i++){
    const usuario: UsuarioEntity = await repository.save({
      nombre: faker.person.firstName(),
      telefono: faker.phone.number(),
    })
    usuarioList.push(usuario)
  }
}
  
 it('should be defined', () => {
   expect(service).toBeDefined();
 });

 it('findAll should return all users', async () => {
  const usuario: UsuarioEntity[] = await service.buscarTodosLosUsuarios();
  expect(usuario).not.toBeNull();
  });

  it('findOne should return a user by id', async () => {
    const storedUsuario: UsuarioEntity = usuarioList[0];
    const usuario: UsuarioEntity = await service.buscarUsuarioPorId(storedUsuario.id);
    expect(usuario).not.toBeNull();
    expect(usuario.nombre).toEqual(storedUsuario.nombre)
  });

  it('create should return a new user', async () => {
    const usuario: UsuarioEntity = {
      id: 0,
      nombre: faker.person.firstName(),
      telefono: "1234567891",
      fotos: [],
      redsocial: null
    }
    const newUsuario: UsuarioEntity = await service.crearUsuario(usuario);
    expect(newUsuario).not.toBeNull();

    const storedUsuario: UsuarioEntity = await repository.findOne({where: {id: newUsuario.id}})
    expect(storedUsuario).not.toBeNull();
    expect(storedUsuario.nombre).toEqual(newUsuario.nombre)
  });

  it('create should not create a user', async () => {
    const usuario: UsuarioEntity = {
      id: 0,
      nombre: faker.person.firstName(),
      telefono: "123456789111",
      fotos: [],
      redsocial: null
    }
    await expect(() => service.crearUsuario(usuario)).rejects.toHaveProperty("message", "The user has an invalid number")
  });

});
