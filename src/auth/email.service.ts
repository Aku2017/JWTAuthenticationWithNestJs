/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config';


@Injectable()
export class EmailService {
        private transporter: nodemailer.Transporter;
        constructor(private jwt: JwtService, private config: ConfigService)
        {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.mail.yahoo.com',
      port: 587,
      secure: false,
      auth: {
        user: 'profmike2005@yahoo.com', // Your email address
        pass: 'Anayochi@total30', // Your email password or API key
      },
                tls: { ciphers: 'SSLv3' },
             });
        }
 
   async sendConfirmationEmail(email: string, userId: number) {
        try {
            // Create a nodemailer transporter
             const confirmationToken = this.signupConfirmation(userId, email);
            // Define the email content
            const mailOptions = {
                from: 'Registration Service',
                to: email, // User's email address
                subject: 'Email Confirmation', // Email subject
                html: `
        <p>Thank you for signing up!</p>
        <p>Please click the following link to confirm your email:</p>
        <a href="https://example.com/confirm?token=${confirmationToken}">Confirm Email</a>
      `,
            };

            // Send the email
            await this.transporter.sendMail(mailOptions);

            console.log('Confirmation email sent successfully.');
            

        }
        catch (error)
        {
            console.error('Error sending confirmation email:', error)
        }
    }
    
     async signupConfirmation(userId: number, email: string)
    {
        const payload = {
            sub: userId,
            email: email,
           
        }

        const secretKey = this.config.get('JWT_SECRET');
        //console.log(secretKey);
        const token = this.jwt.signAsync(payload,
             {
        expiresIn: '15m',
        secret: secretKey,
      },
        );
        return token;
    }
}
