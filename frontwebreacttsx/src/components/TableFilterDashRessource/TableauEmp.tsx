import "bootstrap/dist/css/bootstrap.min.css";
import { SetStateAction, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import FilterSidebar from "../FilterSidebar/FilterSidebar";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import "./Filter.css";
import { Employe } from "../../api/Employe/EmployeModel";
import { useQuery } from "react-query";
import { EmployeService } from "../../api/Employe/EmployeApi";
import SuccessAlert from "../alert/alert";
import { Search } from "@mui/icons-material";
import SearchInput from "../searchInput/SearchInput";

function TableFilterEmp() {
  let employeService: EmployeService = new EmployeService();
  /* __________________________________________________________________________ */

  //states  :
  const [searchInput, setSearchInput] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [allEmployees, setAllEmployees] = useState<Employe[] | undefined>([]);
  const [show, setShow] = useState(false);
  const [showEditEmploye, setShowEditEmploye] = useState(false);
  const [showFilterSidebar, setShowFilterSidebar] = useState(false);
  const [employeToAdd, setEmployeToAdd] = useState<Employe>({
    username: "",
    email: "",
    experience: "",
    titre: "",
    role: "",
    salaire: "",
  });

  const [employeToUpdate, setEmployeToUpdate] = useState<Employe>({
    username: "",
    email: "",
    experience: "",
    titre: "",
    role: "",
    salaire: "",
  });
  const [alertName, setAlertName] = useState<string>("");

  /* React Querry__________________________________________________________________________ */
  const {
    data: allEmployeesdata,
    isLoading: AllEmployeesLoading,
    error: EmployeesEror,
  } = useQuery("All-Employees", employeService.getAllEmployees);

  //deleted emp :
  const deltedEmploye = async (id: number | undefined) => {
    const deleted = await employeService.deleteEmploye(id);
    setAllEmployees(
      allEmployees?.filter((e) => {
        return e.idEmploye !== id;
      })
    );

    setAlertName("deleted");
    setShowAlert(true);
  };

  //add Employe  :
  const addEmploye = async () => {
    const employe = await employeService.AddEmploye(employeToAdd);
    setAllEmployees(
      allEmployees ? [...allEmployees, employeToAdd] : [employeToAdd]
    );
    setAlertName("added");
    setShowAlert(true);
  };

  //updated employe  :
  const updateEmploye = async () => {
    const UpdatedEmploye = await employeService.UpdateEmploye(
      employeToUpdate.idEmploye,
      employeToUpdate
    );
    setAllEmployees((prevAllEmployees) => {
      if (prevAllEmployees) {
        return prevAllEmployees.map((e) => {
          if (e.idEmploye === employeToUpdate.idEmploye) {
            return employeToUpdate;
          } else {
            return e;
          }
        });
      } else {
        return prevAllEmployees;
      }
    });
    setAlertName("updated");
    setShowAlert(true);
  };

  /*Effects _____________________________________________________________________________ */

  //get all Employees  :

  useEffect(() => {
    if (allEmployeesdata) {
      setAllEmployees(allEmployeesdata);
    }
  }, allEmployeesdata);

  /* Funtions______________________________________________________________________________ */

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const handleCloseEditEmpl = () => setShowEditEmploye(false);
  const handleShowEditEmploye = () => setShowEditEmploye(true);
  const handelFilterSidebar = () => {
    setShowFilterSidebar(!showFilterSidebar);
  };

  const filteredEmployees = allEmployees
    ? allEmployees.filter((employee) =>
        employee.username
          ? employee.username
              .toLowerCase()
              .startsWith(searchInput.toLowerCase())
          : console.log("employe.username is not defined")
      )
    : console.log("all employees is not defined");
  /* JSX _________________________________________________________________________________ */

  return (
    <div
      className="container "
      style={{
        width: "75%",
        marginLeft: "23%",
        marginTop: "7%",
      }}
    >
      <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded">
        <div className="row ">
          <div className="col-sm-3 mt-5 mb-4 text-gred">
            <div className="search">
              <form className="form-inline"></form>
            </div>
          </div>

          <div
            className="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred"
            style={{ color: "green" }}
          >
            <div className="searchInputDashEmp">
              <SearchInput
                SearchInputhandel={searchInput}
                setSearchInputhandel={setSearchInput}
              />
            </div>

            <h2>
              <b className="Table-title">Employees Details </b>
            </h2>
          </div>
          <div className="col-sm-3 offset-sm-1  mt-5 mb-4 text-gred">
            <Button variant="primary" onClick={handleShow}>
              Add New Employe
            </Button>
          </div>
          {showAlert && (
            <div>
              <SuccessAlert
                ShowAlert={showAlert}
                setShowAlert={setShowAlert}
                alertName={alertName}
              />
            </div>
          )}
        </div>
        <div className="row">
          <div className="table-responsive ">
            <table className="table table-striped table-hover table-bordered">
              <thead>
                <tr>
                  <th className="table-th">id</th>
                  <th className="table-th">username </th>
                  <th className="table-th">email</th>
                  <th className="table-th">Titre</th>
                  <th className="table-th">Role</th>
                  <th className="table-th">Experience</th>
                  <th className="table-th">EnMission </th>
                  <th className="table-th">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees?.map((e: Employe) => {
                  return (
                    <tr>
                      <td>{e.idEmploye}</td>
                      <td>{e.username}</td>
                      <td>{e.email}</td>
                      <td>{e.titre}</td>
                      <td>{e.role}</td>
                      <td>{e.experience}</td>
                      <td>{e.enMission ? "En mission" : "Pas en mission"}</td>
                      <td>
                        <a
                          onClick={() => {
                            handleShowEditEmploye();
                            setEmployeToUpdate({
                              ...employeToUpdate,
                              idEmploye: e.idEmploye,
                              username: e.username,
                              email: e.email,
                              titre: e.titre,
                              role: e.role,
                              salaire: e.salaire,
                            });
                          }}
                          href="#"
                          className="edit"
                          title="edit"
                          data-toggle="tooltip"
                          style={{ color: "#10ab80" }}
                        >
                          <EditIcon />
                        </a>

                        <a
                          onClick={() => deltedEmploye(e.idEmploye)}
                          href="#"
                          className="delete"
                          title="Delete"
                          data-toggle="tooltip"
                          style={{ color: "red" }}
                        >
                          <DeleteIcon />
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* <!--- Model Box ---> */}

        {/* add Employe div */}
        <div className="model_box">
          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Add Employe</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter Username"
                    onChange={(e) => {
                      setEmployeToAdd((previous) => ({
                        ...previous,
                        username: e.target.value,
                      }));
                    }}
                  />
                </div>
                <div className="form-group mt-3">
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter Email"
                    onChange={(e) => {
                      setEmployeToAdd((previous) => ({
                        ...previous,
                        email: e.target.value,
                      }));
                    }}
                  />
                </div>
                <div className="form-group mt-3">
                  <input
                    type="text  "
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter Diplome"
                    onChange={(e) => {
                      setEmployeToAdd((previous) => ({
                        ...previous,
                        titre: e.target.value,
                      }));
                    }}
                  />
                </div>
                <div className="form-group mt-3">
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Enter Role"
                    onChange={(e) => {
                      setEmployeToAdd((previous) => ({
                        ...previous,
                        role: e.target.value,
                      }));
                    }}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter Experience"
                    onChange={(e) => {
                      setEmployeToAdd((previous) => ({
                        ...previous,
                        experience: e.target.value,
                      }));
                    }}
                  />
                </div>
                <div className="form-group mt-3">
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Enter Salary (En Dinar)"
                    onChange={(e) => {
                      setEmployeToAdd((previous) => ({
                        ...previous,
                        salaire: e.target.value,
                      }));
                    }}
                  />
                </div>

                <button
                  //type="submit"
                  className="btn btn-success mt-4"
                  onClick={() => {
                    addEmploye();
                  }}
                >
                  Add Employe
                </button>
              </form>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
        {/* Model Box Finsihs */}

        {/*updateEmploye ___________________________________ */}

        <div className="model_box">
          <Modal
            show={showEditEmploye}
            onHide={handleCloseEditEmpl}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Update Employe</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter  username"
                    onChange={(e) => {
                      setEmployeToUpdate({
                        ...employeToUpdate,
                        username: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="form-group mt-3">
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter  email"
                    onChange={(e) => {
                      setEmployeToUpdate({
                        ...employeToUpdate,
                        email: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="form-group mt-3">
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter  titre "
                    onChange={(e) => {
                      setEmployeToUpdate({
                        ...employeToUpdate,
                        titre: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="form-group mt-3">
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Enter Role "
                    onChange={(e) => {
                      setEmployeToUpdate({
                        ...employeToUpdate,
                        role: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter Experience"
                    onChange={(e) => {
                      setEmployeToUpdate((previous) => ({
                        ...previous,
                        experience: e.target.value,
                      }));
                    }}
                  />
                </div>
                <div className="form-group mt-3">
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Enter Salary "
                    onChange={(e) => {
                      setEmployeToUpdate({
                        ...employeToUpdate,
                        salaire: e.target.value,
                      });
                    }}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-success mt-4"
                  onClick={updateEmploye}
                >
                  Update
                </button>
              </form>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseEditEmpl}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Model Box Finsihs */}
        </div>
      </div>
    </div>
  );
}

export default TableFilterEmp;
