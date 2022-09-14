import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//component
import Empolyees from "./components/Empolyees";

//pages
import AddEmployee from "./pages/AddEmployee";
import UpdateEmployee from "./pages/UpdateEmployee";

import "./App.css";

function App() {
  const [empolyeeData, setEmployeeData] = useState([]);
  const [employee, setEmployee] = useState({});

  /********************* get all employees ***************************/

  const fetchData = async () => {
    const response = await fetch("http://localhost:5000/employees");
    const data = await response.json();
    return data;
  };

  /********************* ADD new employee ***************************/

  const addEmployee = async (employee) => {
    fetch("http://localhost:5000/employees", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(employee),
    })
      .then((response) => response.json())
      .then((data) => setEmployeeData((prev) => [...prev, data]));
  };

  /********************* delete employee ***************************/

  const deleteEmployee = async (id) => {
    await fetch(`http://localhost:5000/employees/${id}`, {
      method: "DELETE",
    });
    setEmployeeData(empolyeeData.filter((employe) => employe.id !== id));
  };

  /********************* get single employee ***************************/
  const getEmployee = async (id) => {
    const res = await fetch(`http://localhost:5000/employees/${id}`);
    const data = await res.json();
    return data;
  };

  /********************* update employee ***************************/

  const updateEmployee = async (id, data) => {
    fetch(`http://localhost:5000/employees/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => setEmployee(data));
  };

  /********************* useEffect ***************************/

  useEffect(() => {
    const getEmployees = async () => {
      const employees = await fetchData();
      setEmployeeData(employees);
    };
    getEmployees();
  }, [employee]);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Empolyees
                employeeData={empolyeeData}
                handleDelete={deleteEmployee}
                handleUpdate={updateEmployee}
                setEmployee={setEmployee}
              />
            }
          ></Route>
          <Route
            path="/add-employee"
            element={<AddEmployee addEmployee={addEmployee} />}
          ></Route>
          <Route
            path="/update-employee/:id"
            element={
              <UpdateEmployee
                updateEmployee={updateEmployee}
                getEmployee={getEmployee}
              />
            }
          ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
