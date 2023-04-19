import React from "react";
import { Dropdown } from "react-bootstrap";
import DropdownList from "../dropdownList/dropdownList";
import "./FilterSidebar.css";

const FilterSidebar = () => {
  return (
    <div className="filterSidebar">
      <DropdownList    />
      <DropdownList />
      <DropdownList />
      <DropdownList />
    </div>
  );
};

export default FilterSidebar;
