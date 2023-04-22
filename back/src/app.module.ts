import { Module, OnModuleInit } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Connection } from "typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { EmployeModule } from "./employe/employe.module";
import { MissionModule } from "./mission/mission.module";
import { AuthModule } from "./auth/auth.module";
import { DepartementService } from "./departement/departement.service";
import { SkillsModule } from "./skills/skills.module";
import { Employe } from "./dbConfig/employe.entity";
import { AdminSocieteExterne } from "./dbConfig/adminSocieteExterne.entity";
import { SocieteExterne } from "./dbConfig/societeExterne.entity";
import { SocieteInterne } from "./dbConfig/societeInterne.entity";
import { Skills } from "./dbConfig/skills.entity";
import { Mission } from "./dbConfig/mission.entity";
import { AdminSocieteInterne } from "./dbConfig/adminSocieteInterne.entity";
import { AdminSocieteInterneModule } from "./admin-societe-interne/admin-societe-interne.module";
import { DepartementModule } from "./departement/departement.module";
import { Departement } from "./dbConfig/departement.entity";
import { EmployeeSkills } from "./dbConfig/employeSkills.entity";
import { MulterModule } from "@nestjs/platform-express";
import * as express from "express";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      database: "medpfa",
      entities: [
        Employe,
        AdminSocieteExterne,
        SocieteExterne,
        SocieteInterne,
        Skills,
        Mission,
        AdminSocieteInterne,
        Departement,
        EmployeeSkills,
      ],
      username: "root",
      synchronize: true,
    }),
    EmployeModule,
    MissionModule,
    AuthModule,
    SkillsModule,
    AdminSocieteInterneModule,
    DepartementModule,
  ],
  controllers: [AppController],
  providers: [AppService, DepartementService],
})
export class AppModule implements OnModuleInit {
  constructor(private connection: Connection) {}
  async onModuleInit() {
    if (this.connection.isConnected) {
      console.log("connected to the data base ");
    } else {
      console.log("not connected to the data base");
    }
  }
}
