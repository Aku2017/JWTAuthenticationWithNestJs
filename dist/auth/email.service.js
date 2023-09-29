"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const nodemailer = require("nodemailer");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
let EmailService = class EmailService {
    constructor(jwt, config) {
        this.jwt = jwt;
        this.config = config;
    }
    async sendConfirmationEmail(email, userId) {
        try {
            const transporter = nodemailer.createTransport({
                host: 'smtp.mail.yahoo.com',
                port: 587,
                secure: false,
                auth: {
                    user: 'profmike2005@yahoo.com',
                    pass: 'Anayochi@total30',
                },
                tls: { ciphers: 'SSLv3', },
            });
            const confirmationToken = this.signupConfirmation(userId, email);
            const mailOptions = {
                from: 'Registration Service',
                to: email,
                subject: 'Email Confirmation',
                html: `
        <p>Thank you for signing up!</p>
        <p>Please click the following link to confirm your email:</p>
        <a href="https://example.com/confirm?token=${confirmationToken}">Confirm Email</a>
      `,
            };
            await transporter.sendMail(mailOptions);
            console.log('Confirmation email sent successfully.');
        }
        catch (error) {
            console.error('Error sending confirmation email:', error);
        }
    }
    async signupConfirmation(userId, email) {
        const payload = {
            sub: userId,
            email: email,
        };
        const secretKey = this.config.get('JWT_SECRET');
        const token = this.jwt.signAsync(payload, {
            expiresIn: '15m',
            secret: secretKey,
        });
        return token;
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        config_1.ConfigService])
], EmailService);
//# sourceMappingURL=email.service.js.map