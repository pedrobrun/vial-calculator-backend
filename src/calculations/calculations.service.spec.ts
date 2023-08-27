import { Test, TestingModule } from '@nestjs/testing';
import { CalculationsService } from './calculations.service';
import { CalculationsRepository } from './calculations.repository';
import { Caclulations } from './calculations.schema';
import { getModelToken } from '@nestjs/mongoose';

describe('CalculationsService', () => {
  let service: CalculationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CalculationsService,
        CalculationsRepository,
        {
          provide: getModelToken(Caclulations.name),
          useValue: {
            find: jest.fn().mockResolvedValue([]),
          },
        },
      ],
    }).compile();

    service = module.get<CalculationsService>(CalculationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
