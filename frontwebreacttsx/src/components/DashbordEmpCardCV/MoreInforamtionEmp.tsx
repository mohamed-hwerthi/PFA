import React, { useState } from "react";
import { useQuery } from "react-query";
import { EmployeService } from "../../api/Employe/EmployeApi";
import { Employe } from "../../api/Employe/EmployeModel";
import EmployecardCV from "../EmployeCardCv/EmployecardCV";
import SearchInput from "../searchInput/SearchInput";
import "./DashboradEmpCV.css";

const DashboradEmpCardCV = () => {
  let employeService: EmployeService = new EmployeService();

  //states :
  const [allEmployees, setAllEmployees] = useState<Employe[] | undefined>([]);

  //api :
  const {
    data,
    isLoading: AllEmployeesLoading,
    error: EmployeesEror,
  } = useQuery("All-Employees", employeService.getAllEmployees, {
    onSuccess: (data) => {
      setAllEmployees(data);
    },
  });

  //functions  :

  return (
    <div className="fafa">
      <div className="dada">
        <SearchInput />
      </div>
      <div className="hamma">
        {allEmployees?.map((e) => {
          return <EmployecardCV employeObject={e} key={e.idEmploye} />;
        })}
      </div>
    </div>
  );
};

export default DashboradEmpCardCV;
