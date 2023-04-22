import { color } from "@mui/system";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import SearchInput from "../searchInput/SearchInput";
import { CardCVPropsType } from "./cardCVUtils";
import "./employeCard.css";
const EmployecardCV = ({ employeObject }: CardCVPropsType) => {
  //remarque  : ici j'ouvre mon mail  , il faut pour envoyer les emails  : il faut changer pour le mail de la societe
  //states  :
  //function  :

  return (
    <div className="card">
      <p style={{ fontWeight: "bold", fontSize: "25", color: "#0D6EFD" }}>
        {employeObject.username}
      </p>
      <p>
        <a
          style={{ color: "#097CBE" }}
          href={`http://localhost:3030/employe/get-files/${employeObject.cv}`}
          download
        >
          Cv
        </a>
      </p>
      <a
        style={{ color: "#097CBE" }}
        href="https://mail.google.com/mail/u/1/#inbox"
        onClick={() => {}}
      >
        Contact
      </a>
    </div>
  );
};

export default EmployecardCV;
