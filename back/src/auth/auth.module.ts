import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employe } from 'src/dbConfig/employe.entity';
import { JwtModule } from '@nestjs/jwt';
import { AdminSocieteInterne } from 'src/dbConfig/adminSocieteInterne.entity';
import { randomBytes } from 'crypto';

const secret = randomBytes(32).toString('hex');
@Module({
  imports: [
    TypeOrmModule.forFeature([Employe, AdminSocieteInterne]),
    AdminSocieteInterne,
    JwtModule.register({
      secret: secret,
    }),
  ],

  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
