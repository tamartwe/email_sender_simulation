import { Module } from '@nestjs/common';
import { PhishingController } from './phishing.controller';
import { PhishingService } from './phishing.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PhishingEmail, PhishingSchema } from './phishing.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: PhishingEmail.name, schema: PhishingSchema }])],
  controllers: [PhishingController],
  providers: [PhishingService]
})
export class PhishingModule {}
