import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Employe } from "src/dbConfig/employe.entity";
import { Repository, UpdateEvent } from "typeorm";
import { uuid } from "uuidv4";

@Injectable()
export class EmployeService {
  //constructor  :
  constructor(
    @InjectRepository(Employe)
    private readonly employeRepositry: Repository<Employe>,
    private readonly mailerService: MailerService
  ) {}
  //get all employees dans la societe  :
  async findAllEmployees() {
    console.log("test");
    const allEmployees = await this.employeRepositry.find();
    return allEmployees;
  }

  //delete an employe :
  async deleteEmploye(id) {
    const deleted = await this.employeRepositry.delete(id);
    if (deleted) {
      return "deleted";
    } else {
      return "not deleted";
    }
  }

  //add an employe  :
  async create(body: Employe) {
    const password = uuid();
    await this.mailerService.sendMail({
      to: `${body.email}`,
      from: "hwerthihammadi@gmail.com",
      subject: "welcome in our company ",
      text: `hellow ${body.username} , We are thrilled to welcome you as our new ${body.role} at our company! Our team is excited to meet you tomorrow with open arms and friendly smiles. Please use the following password to activate your account: ${password}.
      
      We hope you have a great day and look forward to seeing you soon!
      
      Best regards,`,
    });
    const employeToAdd = { password, ...body };
    const employe = await this.employeRepositry.create(employeToAdd);
    return await this.employeRepositry.save(employe);
  }
  //findEmploye with id  :
  async findById(id) {
    const employe = await this.employeRepositry.findOneBy({ idEmploye: id });
    return employe;
  }
  //find employees that they aren't in mission   :
  async findEmployeQuiNeSontPasEnMission() {
    const employeesQuiNeSontPasEnMission = await this.employeRepositry.find({
      where: { enMission: false },
    });
    return employeesQuiNeSontPasEnMission;
  }

  //find les employes qui ont un skill bien determine :
  async findLesEmployeQuiOntUnSkillBienDetermine(
    idSkill: number
  ): Promise<Employe[]> {
    const querry = `  SELECT e.*
    FROM employe e
    INNER JOIN employee_skills es ON es.idEmploye = e.idEmploye
    INNER JOIN skills s ON s.id = es.idSkill
    WHERE s.id = ${idSkill}`;
    const employees = await this.employeRepositry.query(querry);
    return employees;
  }

  //find les employes qui ont un  skills bien determine avec une experience bien determine  :
  async findEmpSkillExperience(
    idSkill: number,
    experience: number
  ): Promise<Employe[]> {
    const querry = `SELECT e.*
    FROM employe e
    INNER JOIN employee_skills es ON es.idEmploye = e.idEmploye
    INNER JOIN skills s ON s.id = es.idSkill
    WHERE s.id = ${idSkill} AND es.experience >= ${experience};`;
    const employees = await this.employeRepositry.query(querry);
    return employees;
  }

  //find les employes qui  : ont un skills bien determine  et ils sont  _disponible
  async findEmpSkillExpDisponibilite(
    idSkill: number,
    experience: number
  ): Promise<Employe[]> {
    const querry = `SELECT e.* FROM employe e INNER JOIN employee_skills es ON es.idEmploye = e.idEmploye INNER JOIN skills s ON s.id = es.idSkill WHERE s.id = 4 AND es.experience >= 2 AND e.enMission = 0;`;
    const employees = await this.employeRepositry.query(querry);
    return employees;
  }

  //update an employe  :
  async updatedEmploye(id, body) {
    const EmployeToUpdate = await this.employeRepositry.findOneBy({
      idEmploye: id,
    });
    EmployeToUpdate.username = body.username;
    EmployeToUpdate.email = body.email;
    EmployeToUpdate.titre = body.titre;
    EmployeToUpdate.role = body.role;
    EmployeToUpdate.salaire = body.salaire;
    await this.employeRepositry.save(EmployeToUpdate);
  }
}
