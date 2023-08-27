import { Test, TestingModule } from '@nestjs/testing';
import { CalculationsController } from './calculations.controller';
import { CalculationsService } from './calculations.service';
import { CalculationsRepository } from './calculations.repository';
import { getModelToken } from '@nestjs/mongoose';
import { Caclulations } from './calculations.schema';
import { JwtModule } from '@nestjs/jwt';

describe('CalculationsController', () => {
  let controller: CalculationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JwtModule],
      controllers: [CalculationsController],
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

    controller = module.get<CalculationsController>(CalculationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
