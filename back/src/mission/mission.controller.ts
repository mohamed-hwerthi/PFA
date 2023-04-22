import {
  Controller,
  Delete,
  Get,
  Param,
  ParseFilePipe,
  Post,
  Put,
  Res,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Response } from "express";
import { diskStorage } from "multer";
import { Mission } from "src/dbConfig/mission.entity";
import { DeleteResult, UpdateEvent } from "typeorm";
import { MissionService } from "./mission.service";

@Controller("mission")
export class MissionController {
  constructor(private readonly missionService: MissionService) {}
  //get all mission :
  @Get()
  async getAllMissions() {
    console.log("get all missions ");
    return this.missionService.getAllMissions();
  }
  //get one mission with id  :
  @Get(":id")
  async getMissionWithId(@Param("id") id: number) {
    console.log("get mission with id");
    return this.missionService.getMisisonwithId(id);
  }
  //supprimer mission with id :

  @Delete(":id")
  async deleteMission(@Param("id") id: number): Promise<DeleteResult> {
    return this.missionService.deleteMission(id);
  }

  //affecter une missions a un employes  + changemet de l'etat
  @Put("affecterMission/:idMission/:idEmploye")
  async affecterMission(@Param() Param) {
    console.log(Param);
    const { idMission, idEmploye } = Param;
    console.log(idMission);
    console.log(idEmploye);
    return this.missionService.affecterMission(idMission, idEmploye);
  }

  //liste des affectation des missions  :
  @Get("listeAffectation/all")
  async getListeAffectation() {
    return this.missionService.getListeAffectionEmploye();
  }

  //annuler une mission  :
  @Put("annuler-mission/:id")
  async annulerUneMission(@Param("id") id): Promise<Mission> {
    return this.missionService.annulateMission(id);
  }
  //terminer  :
  @Put("terminer-mission/med/:id")
  async terminerMission(@Param("id") id: number): Promise<Mission> {
    return this.missionService.terminerMission(id);
  }

  //uploading file  : note sur missions  :

  @Post("note/noteM")
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: "../files/noteMission",
        filename(req, file, callback) {
          const newFileName = file.originalname;
          callback(null, newFileName);
        },
      }),
    })
  )
  uploadFile(
    @UploadedFile(new ParseFilePipe({}))
    file: Express.Multer.File
  ) {
    console.log("s,jfdlasjflkjsl");
    console.log(file);
  }
  //getting file  : note sur mission  :
  @Get("getMissionNote/:filename")
  async getFile(@Param("filename") filename: string, @Res() res: Response) {
    res.sendFile(filename, { root: "../files/noteMission" });
  }
}
