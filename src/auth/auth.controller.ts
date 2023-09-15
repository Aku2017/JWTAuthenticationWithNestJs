/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
import { Body, Controller,  Post } from '@nestjs/common';
/*import { Request } from 'express';*/
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
/*import { AuthDto } from './dto';*/

@Controller()
export class AuthController {
    constructor(private authService: AuthService) { }
    

  /*@Post('signup')
  signup(@Req() req: Request) {
      console.log(req.body);
    return this.authService.signup;
  }*/

    @Post('signup')
   async signup(@Body() dto: AuthDto) 
    {
        return this.authService.signup(dto);
    }   
    
    @Post('signin')
    signin(@Body() dto: AuthDto) {
    return this.authService.signin(dto);
  }
}
