import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { Employe } from "src/dbConfig/employe.entity";
import { EmployeService } from "./employe.service";

@Controller("employe")
export class EmployeController {
  constructor(private readonly employeService: EmployeService) {}
  //get all employees  :
  @Get()
  async findall(): Promise<Employe[]> {
    return await this.employeService.findAllEmployees();
  }
  //supprimer un employe :
  @Delete(":id")
  async deleteEnploye(@Param("id") id) {
    return this.employeService.deleteEmploye(id);
  }
  //ajouter un employe :
  @Post()
  async addEmploye(@Body() Body) {
    return this.employeService.create(Body);
  }
  //find an employe with id  :
  @Get(":id")
  async findEmployeWithId(@Param("id") id: number) {
    return this.employeService.findById(id);
  }
  //filtrer les employes suivant la disponibilite  :
  @Get("filtrer/nonEnMission")
  async findLesEmployesQuiNeSontPasEnMission() {
    console.log("non en mission ");
    return this.employeService.findEmployeQuiNeSontPasEnMission();
  }

  //filter les employes   qui ont un skills bien determine  :
  @Get("filtrer/skill/:idSkill")
  async findLesEmployeQuiOntUnSkillBienDetermine(
    @Param("idSkill") idskill: number
  ): Promise<Employe[]> {
    return this.employeService.findLesEmployeQuiOntUnSkillBienDetermine(
      idskill
    );
  }

  //filtrer les employes qui ont une experience bien determine dans un skill bien precis  :
  @Get("filtrer/skill/:idSkill/:experience")
  async findLesEmployeQuiOntUneExperienceBienDetermineDansUnSkill(
    @Param() Param
  ): Promise<Employe[]> {
    const { idSkill, experience } = Param;

    return this.employeService.findEmpSkillExperience(idSkill, experience);
  }

  //find  les employes qui ont : - une competence bien precise avec une experience et qui sont disponible  :
  @Get("filter/skill/dispo/:idSkill/:experience")
  async findEmpSkillExpDispo(@Param() Param): Promise<Employe[]> {
    const { idSkill, experience } = Param;
    return this.employeService.findEmpSkillExpDisponibilite(
      idSkill,
      experience
    );
  }

  //update an employe  :
  @Put("updatedEmploye/:id")
  async updatedEmploye(@Param("id") id, @Body() body): Promise<void> {
    return this.employeService.updatedEmploye(id, body);
  }


}
