import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { v4 as uuidv4 } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PhishingEmail } from './phishing.schema';
import { EmailDto } from './phishing.dto';

import * as dotenv from "dotenv";

dotenv.config(); 


@Injectable()
export class PhishingService {
  constructor(
    @InjectModel(PhishingEmail.name) private phishingModel: Model<PhishingEmail>
  ) {}

  async sendEmail(emailDto: EmailDto): Promise<any> {

    const email = emailDto.email;
    const attemptId = uuidv4();
    const attempt = 0; // Initial attempt

    // Create a nodemailer transporter (SMTP)
    const transporter = nodemailer.createTransport({
      host: 'smtp.mailosaur.net',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'iavwuomo@mailosaur.net',
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const html = `<p>Please click <a href="http://localhost:3000/phishing/${attemptId}">here</a></p>`;
    console.log(html);

    // Email content
    const mailOptions = {
      from: "trick-memory@iavwuomo.mailosaur.net",
      to: email,
      subject: 'Test Email',
      html: html,
    };

    // Send email
    let info;
    try {
        info = await transporter.sendMail(mailOptions);    
    } catch(ex) {
        console.error(ex);
        return { error: ex.message };
    }
    console.log('Email sent: ' + info.response);
        // Save record in MongoDB
    await this.phishingModel.create({ attemptId, email, attempt });
    return { message: 'Email sent and record saved successfully.' }; 
  }

  async updateAttemptsById(id: string): Promise<any> {
    try {
      const record: any = await this.phishingModel.findOne({ attemptId: id });
      if (record) {
        record.attempt = record.attempt + 1; // Increment attempts
        await record.save();
        return { message: 'Attempts updated successfully.' };
      } else {
        return { message: 'Record not found' };
      }
    } catch (ex) {
      console.error(ex);
      return { error: ex.message };
    }
  }
}