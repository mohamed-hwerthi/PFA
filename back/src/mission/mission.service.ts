import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employe } from 'src/dbConfig/employe.entity';
import { Mission } from 'src/dbConfig/mission.entity';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class MissionService {
  constructor(
    @InjectRepository(Mission)
    private readonly missionRepositry: Repository<Mission>,
    @InjectRepository(Employe)
    private readonly employeRepositry: Repository<Employe>,
    private readonly mailService: MailerService,
  ) {}

  //get all missions  :
  async getAllMissions(): Promise<Mission[]> {
    const allMisssions = await this.missionRepositry.find();
    return allMisssions;
  }

  //get missions with id :
  async getMisisonwithId(id): Promise<Mission> {
    const mission = await this.missionRepositry.findOneBy({ id: id });
    return mission;
  }

  //supprimer une mission :
  async deleteMission(id): Promise<DeleteResult> {
    const deleted = await this.missionRepositry.delete({ id: id });
    return deleted;
  }
  //affecter une mission a un ou plusieurs employes  :
  async affecterMission(idMission, idEmploye): Promise<String> {
    const mission = await this.missionRepositry.findOneBy({ id: idMission });
    const employe: Employe = await this.employeRepositry.findOneBy({
      idEmploye: idEmploye,
    });
    mission.statutMission = 'en cours';
    employe.enMission = true;
    employe.mission = mission;
    await this.employeRepositry.save(employe);
    await this.missionRepositry.save(mission);
    //send email to employees that he is affected in mission  :
    await this.mailService.sendMail({
      to: `${employe.email}`,
      from: 'hwerthihammadi@gmail.com',
      subject: 'welcome in our company ',
      text: `Cher/Chère ${employe.username},

      on a  le plaisir de vous informer que vous avez été affecté(e) à une mission importante pour notre entreprise. Cette mission nécessite des compétences et des qualités que vous possédez, et on est convaincu(e) que vous ferez un excellent travail.
      
      La mission débutera le ${mission.dateDebut} et finit en ${mission.dateFin} .votre titre dans cette mission sera  : ${employe.titre}. Vous travaillerez en étroite collaboration avec Microsoft paris , qui vous aideront à atteindre les objectifs fixés.
      
      Je vous encourage à vous préparer en conséquence en lisant attentivement les informations sur la mission et en posant toutes les questions que vous pourriez avoir. 
      
      on est  convaincu que vous contribuerez au succès de cette mission, et je vous souhaite tout le succès dans cette nouvelle tâche.
      
      Cordialement,`,
    });
    return `mission affecte avec succes a l'employe `;
  }

  //get liste des affectations des employes  :
  async getListeAffectionEmploye() {
    const sqlRequest =
      'SELECT * FROM employe , mission WHERE employe.missionId=mission.id';
    const listeAffectation = await this.employeRepositry.query(sqlRequest);
    return listeAffectation;
  }

  //Annuler une mission  :
  async annulateMission(idMission) {
    const mission: Mission = await this.missionRepositry.findOneBy({
      id: idMission,
    });
    mission.statutMission = 'annulée';
    return await this.missionRepositry.save(mission);
  }

  //Terminer une mission   :
  async terminerMission(idMission) {
    const mission: Mission = await this.missionRepositry.findOneBy({
      id: idMission,
    });
    return await this.missionRepositry.save(mission);
  }
}
