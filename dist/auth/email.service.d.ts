import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
export declare class EmailService {
    private jwt;
    private config;
    constructor(jwt: JwtService, config: ConfigService);
    sendConfirmationEmail(email: string, userId: number): Promise<void>;
    signupConfirmation(userId: number, email: string): Promise<string>;
}
