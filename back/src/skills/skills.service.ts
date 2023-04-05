import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Skills } from 'src/dbConfig/skills.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(Skills)
    private readonly skillRepositry: Repository<Skills>,
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
}
