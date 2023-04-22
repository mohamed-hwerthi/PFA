import { Module } from "@nestjs/common";
import { EmployeService } from "./employe.service";
import { EmployeController } from "./employe.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Employe } from "src/dbConfig/employe.entity";
import { MailerModule } from "@nestjs-modules/mailer";
import { MulterModule } from "@nestjs/platform-express";

@Module({
  imports: [
    TypeOrmModule.forFeature([Employe]),
    MailerModule.forRoot({
      transport: {
        host: "smtp.gmail.com",
        auth: {
          user: "hwerthihammadi@gmail.com",
          pass: "pmxb qwsx tcvo jxfc",
        },
      },
    }),
  ],
  providers: [EmployeService],
  controllers: [EmployeController],
  exports: [TypeOrmModule.forFeature([Employe])],
})
export class EmployeModule {}
