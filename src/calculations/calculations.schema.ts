import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CalculationsDocument = HydratedDocument<Caclulations>;

@Schema()
export class Caclulations {
  @Prop({ type: Array<string> })
  operations: string[];

  @Prop({ type: String, required: true })
  userId: string;

  @Prop({ required: true, default: Date.now(), index: true, type: Date })
  createdAt: Date;
}

export const CaclulationsSchema = SchemaFactory.createForClass(Caclulations);
