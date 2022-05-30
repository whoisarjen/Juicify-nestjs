import { Controller, Request, Post, Get } from '@nestjs/common';
import { Public } from 'src/decorators/public.decorator';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
    constructor(private authService: AuthService) {}
    
    @Public()
    @Post('/login')
    async login(@Request() req) {
        return this.authService.login(req.body);
    }

    @Get('profile')
    getProfile(@Request() req) {
      return req;
    }
}