import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PhishingService } from './phishing.service';
import { EmailDto } from './phishing.dto';

@Controller('phishing')
export class PhishingController {
  constructor(private readonly phishingService: PhishingService) {}

  
  @Post('send')
  create(@Body() emailDto: EmailDto): Promise<any> {
    return this.phishingService.sendEmail(emailDto);
  }

  @Get(':id')
  async updateAttempts(@Param('id') id: string): Promise<any> {
    return this.phishingService.updateAttemptsById(id);
  }
  
}