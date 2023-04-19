import React from "react";
import { Link } from "react-router-dom";
import SearchInput from "../searchInput/SearchInput";
import { CardCVPropsType } from "./cardCVUtils";
import "./employeCard.css";
const EmployecardCV = ({ employeObject }: CardCVPropsType) => {
  return (
    <div className="card">
      <p>{employeObject.username}</p>
      <p>cv</p>
      <p>contact</p>
    </div>
  );
};

export default EmployecardCV;
