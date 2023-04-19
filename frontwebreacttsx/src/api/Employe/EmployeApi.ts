import { RestaurantOutlined } from "@mui/icons-material";
import axios, { AxiosResponse } from "axios";
import { Employe } from "./EmployeModel";

export class EmployeService {
  constructor() {}

  //get all employees  :
  async getAllEmployees(): Promise<Employe[]> {
    const response: AxiosResponse = await axios.get(
      `http://localhost:3030/employe`
    );
    return response.data;
  }

  //get an employe  :
  async getAnEmploye(id: number): Promise<Employe> {
    const response: AxiosResponse = await axios.get(
      `http://localhost:3030/employe/${id}`
    );
    return response.data;
  }

  //supprimer un employe  :
  async deleteEmploye(id: number | undefined) {
    const response: AxiosResponse = await axios.delete(
      `http://localhost:3030/employe/${id}`
    );
    return response.data;
  }

  //ajouter un employe  :
  async AddEmploye(body: Employe) {
    const response: AxiosResponse = await axios.post(
      `http://localhost:3030/employe`,
      body
    );
    return response.data;
  }

  //modifier un employe  :
  async UpdateEmploye(idEmploye: number | undefined, body: Employe) {
    const response: AxiosResponse = await axios.put(
      `http://localhost:3030/employe/updatedEmploye/${idEmploye}`,
      body
    );
  }

  //filtrer les employes suivant la disponbilite
  async FiltrageEmploye(): Promise<Employe[]> {
    const response: AxiosResponse = await axios.get(
      `http://localhost:3030/employe/filtrer/nonEnMission`
    );
    return response.data;
  }

  //get all departement  :
}
