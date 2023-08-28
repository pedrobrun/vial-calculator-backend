import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  UseGuards,
  Query,
} from '@nestjs/common';
import { CalculationsService } from './calculations.service';
import { CreateCalculationDto } from './dto/create-calculation.dto';
import { AuthenticationGuard } from '../authentication/authentication.guard';

@Controller('calculations')
export class CalculationsController {
  constructor(private readonly calculationsService: CalculationsService) {}

  @Post()
  @UseGuards(AuthenticationGuard)
  create(
    @Body() createCalculationDto: CreateCalculationDto,
    @Request() request,
  ) {
    return this.calculationsService.create(
      createCalculationDto,
      request.user.id || request.user._id,
    );
  }

  @Get()
  @UseGuards(AuthenticationGuard)
  findOne(
    @Query('start') start: string,
    @Query('end') end: string,
    @Request() request,
  ) {
    return this.calculationsService.findByUserAndDate(
      start,
      end,
      request.user.id || request.user._id,
    );
  }
}
