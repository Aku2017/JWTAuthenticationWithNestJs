/* eslint-disable prettier/prettier */
import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable,  ForbiddenException } from '@nestjs/common';
/*import { Response } from 'express';*/
import * as argon from 'argon2'
import { AuthDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';


@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService,
        private jwt: JwtService,
        private config: ConfigService,
     
/*@Inject(ConfigService) private configService: ConfigService,*/) { }
 
    async signup(dto: AuthDto) {
    
        // generating password hash
        const hash = await argon.hash(dto.password);

        try {
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hash,
                    firstName: dto.firstName,
                    lastName: dto.lastName
                },
            });
   
        await this.sendConfirmationEmail(user.email,user.id);

    // Return a response indicating that the user needs to check their email for confirmation
        return  this.signToken(user.id, user.email);
       // message: 'User created. Check your email for confirmation.',
            
        }
        catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException(
                        'Credentials taken',
                    );
                }
            }
            throw error;
        }
    }

   async sendConfirmationEmail(email: string, userId: number) {
        try {
            // Create a nodemailer transporter
            const transporter = nodemailer.createTransport({
                // Replace with your email service configuration (e.g., SMTP or a third-party service)
                host: 'smtp.gmail.com',
                port: 465,
                secure:true,
                auth: {
                    user: 'akuanayochi2015@gmail.com', // Your email address
                    pass: 'Anayochi@total30',    // Your email password or API key
                },
            });
            
            const confirmationToken = this.signupConfirmation(userId, email);
            // Define the email content
            const mailOptions = {
                from: 'akuanayochi2015@gmail.com',
                to: email, // User's email address
                subject: 'Email Confirmation', // Email subject
                html: `
        <p>Thank you for signing up!</p>
        <p>Please click the following link to confirm your email:</p>
        <a href="https://example.com/confirm?token=${confirmationToken}">Confirm Email</a>
      `,
            };

            // Send the email
            await transporter.sendMail(mailOptions);

            console.log('Confirmation email sent successfully.');
            

        }
        catch (error)
        {
            console.error('Error sending confirmation email:', error)
        }
    }

    async signin(dto: AuthDto)
    {
         // find the user by email
    const user =
      await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });
    // if user does not exist throw exception
    if (!user)
      throw new ForbiddenException(
        'Credentials incorrect',
      );

    // compare password
    const pwMatches = await argon.verify(
      user.hash,
      dto.password,
    );
    // if password incorrect throw exception
    if (!pwMatches)
      throw new ForbiddenException(
        'Credentials incorrect',
      );
    return this.signToken(user.id, user.email);
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

    async signToken(userId: number, email: string,): Promise<{ access_token: string }>
    {
    const payload = {
      sub: userId,
      email,
    };
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(
      payload,
      {
        expiresIn: '15m',
        secret: secret,
      },
    );
//console.log(token);
    return {
        access_token: token,
        };
        
    }
    
 
}

