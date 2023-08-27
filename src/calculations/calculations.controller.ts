import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CalculationsService } from './calculations.service';
import { CreateCalculationDto } from './dto/create-calculation.dto';
import { AuthenticationGuard } from 'src/authentication/authentication.guard';

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

  @Get(':date')
  @UseGuards(AuthenticationGuard)
  findOne(@Param('date') date: string, @Request() request) {
    return this.calculationsService.findByUserAndDate(date, request.user.id);
  }
}
