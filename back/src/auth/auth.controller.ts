import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request, Response } from "express";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private jwtService: JwtService
  ) {}

  @Post("login/admin/interne")
  async login(@Body() body: any, @Res({ passthrough: true }) res: Response) {
    const user = await this.authService.validateAdmin(body);
    const { email, password } = body;
    console.log({ email, password });
    if (!user) {
      return "not account found for this user ";
    } else {
      if (user.password === password) {
        const payload = { email: user.email, sub: user.id };
        const accesToken = await this.jwtService.signAsync(payload);
        res.cookie("jwt", accesToken, { httpOnly: true });

        console.log(accesToken);
        return "success login ";
      } else {
        return "wrong password";
      }
    }
  }

  //verifie adminInterne from cookies :
  @Get("verifier-token-login")
  async verifierAdminInterne(@Req() req: Request) {
    try {
      const cookie = req.cookies["jwt"];
      const data = await this.jwtService.verifyAsync(cookie);
      if (!data) {
        throw new UnauthorizedException();
      }
      const { email, ...aa } = data;
      const user = await this.authService.findAdminWithEmail(email);
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  //auth employe login  :
  @Post("login/employe")
  async loginEmploye(@Body() body: any) {
    const emp = await this.authService.validateEmploye(body);
    return emp;
  }
}
