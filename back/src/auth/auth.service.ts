import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminSocieteInterne } from 'src/dbConfig/adminSocieteInterne.entity';
import { Employe } from 'src/dbConfig/employe.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AdminSocieteInterne)
    private readonly adminRepositry: Repository<AdminSocieteInterne>,
    private readonly jwtService: JwtService,
    @InjectRepository(Employe)
    private readonly employeRepositry: Repository<Employe>,
  ) {}
  //methode validate the information of authentification  :
  async validateAdmin(bodydata) {
    const { email, password } = bodydata;
    const user = await this.adminRepositry.findOneBy({ email: email });
    if (!user) {
      return 'not account found for this user ';
    } else {
      if (user.password === password) {
        console.log('vrai password ');
        const payload = { email: user.email, sub: user.id };
        const accesToken = this.jwtService.sign(payload);
        console.log(accesToken);
        return accesToken;
      } else {
        return 'wrong password';
      }
    }
  }

  //auth login employe  :
  async validateEmploye(bodydata) {
    const { email, password } = bodydata;
    const user = await this.employeRepositry.findOneBy({ email: email });
    if (!user) {
      return 'not account found for this user ';
    } else {
      if (user.password === password) {
        console.log('vrai password ');
        return user;
      } else {
        return 'wrong password';
      }
    }
  }
}
