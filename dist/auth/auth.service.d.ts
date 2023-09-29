import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { EmailService } from './email.service';
export declare class AuthService {
    private prisma;
    private jwt;
    private config;
    private emailService;
    constructor(prisma: PrismaService, jwt: JwtService, config: ConfigService, emailService: EmailService);
    signup(dto: AuthDto): Promise<{
        access_token: string;
    }>;
    signin(dto: AuthDto): Promise<{
        access_token: string;
    }>;
    signupConfirmation(userId: number, email: string): Promise<string>;
    signToken(userId: number, email: string): Promise<{
        access_token: string;
    }>;
}
