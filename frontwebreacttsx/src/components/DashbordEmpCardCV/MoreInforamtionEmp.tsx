import React, { useEffect, useState } from "react";
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
  const [SearchInputhandel, setSearchInputhandel] = useState("");

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
  //filter employees with searching  :
  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchInputhandel(event.target.value);
  };

  const filteredEmployees = allEmployees
    ? allEmployees.filter((employee) =>
        employee.username
          ? employee.username
              .toLowerCase()
              .startsWith(SearchInputhandel.toLowerCase())
          : console.log("employe.username is not defined")
      )
    : console.log("all employees is not defined");

  return (
    <div className="fafa">
      <div className="dada">
        <SearchInput
          SearchInputhandel={SearchInputhandel}
          setSearchInputhandel={setSearchInputhandel}
        />       
      </div>

      <div className="hamma">
        {filteredEmployees?.map((e) => {
          return <EmployecardCV employeObject={e} key={e.idEmploye} />;
        })}
      </div>
    </div>
  );
};

export default DashboradEmpCardCV;
