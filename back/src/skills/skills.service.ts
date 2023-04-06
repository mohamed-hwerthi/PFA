import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Skills } from "src/dbConfig/skills.entity";
import { Repository } from "typeorm";

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(Skills)
    private readonly skillRepositry: Repository<Skills>
  ) {}

  //find all skills  :
  async findAllSkills(): Promise<Skills[]> {
    const allSkills = await this.skillRepositry.find();
    return allSkills;
  }

  //find a skill with  name  :
  async findSkillWithName(name: string) {
    const skill = await this.skillRepositry.findOneBy({ name: name });
    console.log(skill);
    return skill;
  }
  //find a skills with id  :
  async findSkillWithId(id: number) {
    const skill = await this.skillRepositry.findOneBy({ id: id });
    console.log(skill);
    return skill;
  }
  //find employe skills  ://hobbi nader
  async findEmployeSkills(idEmploye: number) {
    const querry = `SELECT skills.id , skills.name FROM skills , employe_skills_skills , employe WHERE skills.id=employe_skills_skills.skillsId and employe.idEmploye = employe_skills_skills.employeIdEmploye AND employe.idEmploye =${idEmploye};`;
    return await this.skillRepositry.query(querry);
  }
}
