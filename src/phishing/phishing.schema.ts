import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import mongoose from 'mongoose';

export type PhishingDocument = HydratedDocument<PhishingEmail>;

@Schema()
export class PhishingEmail {
  @Prop()
  attemptId: string;
  
  @Prop()
  email: string;

  @Prop()
  attempt: number;

}

export const PhishingSchema =  new mongoose.Schema({
  attemptId: String,
  email: String,
  attempt: Number,
});