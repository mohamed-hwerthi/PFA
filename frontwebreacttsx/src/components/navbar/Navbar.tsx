import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import SearchInput from "../searchInput/SearchInput";
import "./Navbar.css";
import { navbarPropsType } from "./navbarUtils";

function Navbar({ activatedLink, setActivatedNavLink }: navbarPropsType) {
  const navRef = useRef<HTMLDivElement>(null);
  const showNavbar = () => {
    navRef.current?.classList.toggle("responsive_nav");
  };

  return (
    <header style={{ backgroundColor: "#0D6EFD", position: "fixed", top: "0" }}>
      <h3>LOGO</h3>
      <SearchInput />

      <nav ref={navRef}>
        <a onClick={() => setActivatedNavLink("ressource")}>
          <Link to="/loginI/dashbordadminI/TableauDebordRessources">
            Ressource management
          </Link>
        </a>
        <a onClick={() => setActivatedNavLink("mission")}>
          <Link to="/loginI/dashbordadminI">Mission management</Link>{" "}
        </a>
        <a onClick={() => setActivatedNavLink("affectation")}>
          <Link to="/loginI/dashbordadminI">Affectation management</Link>
        </a>
        <a onClick={() => setActivatedNavLink("skill")}>
          <Link to="/loginI/dashbordadminI">Skills management</Link>
        </a>
        <button className="nav-btn nav-close-btn" onClick={showNavbar}>
          <FaTimes />
        </button>
      </nav>
      <button className="nav-btn" onClick={showNavbar}>
        <FaBars />
      </button>
    </header>
  );
}

export default Navbar;
