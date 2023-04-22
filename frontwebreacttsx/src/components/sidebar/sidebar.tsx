import React from "react";
import SidebarAffectation from "./SidebarAffectation";
import SidebarMisssion from "./SidebarMission";
import SidebarRessource from "./sidebarRessource";
import SidebarSkills from "./SidebarSkills";
import { navbarPropsType } from "./sidebarUtils";

const sidebar = ({ activatedLink, setActivatedNavLink }: navbarPropsType) => {
  const sidebarToHandel = () => {
    switch (activatedLink) {
      case "ressource":
        return <SidebarRessource />;
        break;
      case "affectation":
        return <SidebarAffectation />;
      case "skill":
        return <SidebarSkills />;
      case "mission":
        return <SidebarMisssion />;

      default:
        return <SidebarRessource />;
        break;
    }
  };
  return <div>{sidebarToHandel()}</div>;
};

export default sidebar;
