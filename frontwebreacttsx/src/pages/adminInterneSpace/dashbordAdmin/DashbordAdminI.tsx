import { useState } from "react";
import Navbar from "../../../components/navbar/Navbar";
import SearchInput from "../../../components/searchInput/SearchInput";
import Sidebar from "../../../components/sidebar/sidebar";
import "./med.css";
import DropdownList from "../../../components/dropdownList/dropdownList";
const DashbordAdminI = () => {
  const [activatedNaberLink, setActivatedNavLink] = useState("missions");
  return (
    <>
      <Navbar
        activatedLink={activatedNaberLink}
        setActivatedNavLink={setActivatedNavLink}
      />

      <Sidebar
        activatedLink={activatedNaberLink}
        setActivatedNavLink={setActivatedNavLink}
      />
    </>
  );
};

export default DashbordAdminI;
