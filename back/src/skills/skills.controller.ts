import { Controller, Get, Param } from '@nestjs/common';
import { Skills } from 'src/dbConfig/skills.entity';
import { SkillsService } from './skills.service';

@Controller('skills')
export class SkillsController {
  //constructor  :
  constructor(private readonly skillService: SkillsService) {}
  //find all skills  :
  @Get()
  async findAllSkills(): Promise<Skills[]> {
    console.log('get all skills ');
    return this.skillService.findAllSkills();
  }

  //find a skills with name  :
  @Get(':name')
  async findSkillWithName(@Param('name') name: string): Promise<Skills> {
    return this.skillService.findSkillWithName(name);
  }

  //find a skill with id  :
  @Get('id/:id')
  async findSkillWithId(@Param('id') id: number): Promise<Skills> {
    return this.skillService.findSkillWithId(id);
  }
}
