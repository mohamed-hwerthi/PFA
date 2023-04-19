import "./App.css";
import { Routes, Route } from "react-router-dom";
import EmployeSpace from "./pages/employeSpace/EmployeSpace";
import AdminExterneSpace from "./pages/adminExterneSpace/adminExterneSpace";
import AdminInterneSpace from "./pages/adminInterneSpace/adminInterneSpace";
import SuperAdminSpace from "./pages/adminExterneSpace/superAdminSpace";
import LoginAdminInterne from "./pages/adminInterneSpace/Login/Login";
import DashbordAdminI from "./pages/adminInterneSpace/dashbordAdmin/DashbordAdminI";
import DashboradEmpCardCV from "./components/DashbordEmpCardCV/MoreInforamtionEmp";
import TableFilterEmp from "./components/TableFilterDashRessource/TableauEmp";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<AdminInterneSpace />} />
        <Route path="/adminExterne" element={<AdminExterneSpace />} />
        <Route path="/employe" element={<EmployeSpace />} />
        <Route path="/superAdmin" element={<SuperAdminSpace />} />
        <Route path="/loginI" element={<LoginAdminInterne />} />
        <Route path="/loginI/dashbordadminI" element={<TableFilterEmp />} />
        <Route
          path="/loginI/dashbordadminI/TableauDebordRessources"
          element={<TableFilterEmp />}
        />

        <Route
          path="/loginI/dashbordadminI/employeCV"
          element={<DashboradEmpCardCV />}
        />
      </Routes>
      <DashbordAdminI />
    </div>
  );
}

export default App;
