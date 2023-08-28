import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Caclulations } from './calculations.schema';
import { CreateCalculationDto } from './dto/create-calculation.dto';
import { CalculationEntity } from './entities/calculation.entity';

@Injectable()
export class CalculationsRepository {
  constructor(
    @InjectModel(Caclulations.name)
    private calculationsModel: Model<Caclulations>,
  ) {}

  async create(
    createCalculationDto: CreateCalculationDto,
    userId: string,
  ): Promise<CalculationEntity> {
    const { operation } = createCalculationDto;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const calculation = await this.calculationsModel.findOneAndUpdate(
      {
        createdAt: {
          $gte: today,
          $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
        },
        userId,
      },
      {
        $push: { operations: operation },
        $setOnInsert: { createdAt: today },
      },
      {
        upsert: true,
        new: true,
      },
    );

    return calculation.toObject();
  }

  async findByUserAndDate(start: string, end: string, userId: string) {
    return await this.calculationsModel
      .findOne({
        userId,
        createdAt: {
          $gte: start,
          $lte: end,
        },
      })
      .select('operations')
      .exec();
  }
}
