import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login/admin')
  async login(@Body() body: any) {
    const response = await this.authService.validateAdmin(body);
    return response;
  }

  //auth emplye login  :
  @Post('login/employe')
  async loginEmploye(@Body() body: any) {
    const response = await this.authService.validateEmploye(body);
    return response;
  }
}
