import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { response } from "express";
import { AdminSocieteInterne } from "src/dbConfig/adminSocieteInterne.entity";
import { Employe } from "src/dbConfig/employe.entity";
import { Repository } from "typeorm";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AdminSocieteInterne)
    private readonly adminRepositry: Repository<AdminSocieteInterne>,
    private readonly jwtService: JwtService,
    @InjectRepository(Employe)
    private readonly employeRepositry: Repository<Employe>
  ) {}
  //methode validate the information of authentification  :
  async validateAdmin(bodydata) {
    const { email, password } = bodydata;
    return await this.adminRepositry.findOneBy({ email: email });
  }

  //auth login employe  :
  async validateEmploye(bodydata) {
    const { email, password } = bodydata;
    const user = await this.employeRepositry.findOneBy({ email: email });
    if (!user) {
      return "not account found for this user ";
    } else {
      if (user.password === password) {
        console.log("vrai password ");
        return user;
      } else {
        return "wrong password";
      }
    }
  }

  //find employe with email :
  async findAdminWithEmail(email) {
    return await this.adminRepositry.findOneBy({ email: email });
  }
}
