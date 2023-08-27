import { Injectable } from '@nestjs/common';
import { CreateCalculationDto } from './dto/create-calculation.dto';
import { CalculationsRepository } from './calculations.repository';

@Injectable()
export class CalculationsService {
  constructor(
    private readonly calculationsRepository: CalculationsRepository,
  ) {}

  async create(createCalculationDto: CreateCalculationDto, userId: string) {
    return await this.calculationsRepository.create(
      createCalculationDto,
      userId,
    );
  }

  async findByUserAndDate(date: string, userId: string) {
    return await this.calculationsRepository.findByUserAndDate(date, userId);
  }
}
