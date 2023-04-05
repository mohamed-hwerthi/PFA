import { Test, TestingModule } from '@nestjs/testing';
import { AdminSocieteInterneService } from './admin-societe-interne.service';

describe('AdminSocieteInterneService', () => {
  let service: AdminSocieteInterneService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminSocieteInterneService],
    }).compile();

    service = module.get<AdminSocieteInterneService>(AdminSocieteInterneService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
