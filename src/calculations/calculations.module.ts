import { Module } from '@nestjs/common';
import { CalculationsService } from './calculations.service';
import { CalculationsController } from './calculations.controller';
import { JwtModule } from '@nestjs/jwt';
import { CalculationsRepository } from './calculations.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Caclulations, CaclulationsSchema } from './calculations.schema';

@Module({
  imports: [
    JwtModule,
    MongooseModule.forFeature([
      { name: Caclulations.name, schema: CaclulationsSchema },
    ]),
  ],
  controllers: [CalculationsController],
  providers: [CalculationsService, CalculationsRepository],
})
export class CalculationsModule {}
