import { Test, TestingModule } from '@nestjs/testing';
import { AdminSocieteInterneController } from './admin-societe-interne.controller';

describe('AdminSocieteInterneController', () => {
  let controller: AdminSocieteInterneController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminSocieteInterneController],
    }).compile();

    controller = module.get<AdminSocieteInterneController>(AdminSocieteInterneController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
