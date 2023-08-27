import { IsString } from 'class-validator';

export class CreateCalculationDto {
  @IsString()
  operation: string;
}
