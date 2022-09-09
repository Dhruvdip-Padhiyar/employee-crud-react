import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Empolyee from "./components/Empolyee";
import { useState, useEffect } from "react";

function App() {
  const [empolyeeData, setEmployeeData] = useState([]);

  const fetchData = async () => {
    const response = await fetch(
      "https://dummy.restapiexample.com/api/v1/employees"
    );
    const data = await response.json();
    localStorage.setItem("employess", JSON.stringify(data));
    return data;
  };

  const addEmployee = async (employee) => {
    const response = await fetch(
      "https://dummy.restapiexample.com/api/v1/create",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(employee),
      }
    );
    const data = await response.json();

    setEmployeeData([...employee, data]);
  };

  const deleteEmployee = async (id) => {
    await fetch(`https://dummy.restapiexample.com/api/v1/delete/${id}`, {
      method: "DELETE",
    });
    console.log(empolyeeData.data.filter((employe) => employe.id !== id));

    setEmployeeData(empolyeeData.data.filter((employe) => employe.id !== id));
  };

  useEffect(() => {
    const getEmployees = async () => {
      const employees = await fetchData();
      setEmployeeData(employees);
      console.log(JSON.parse(localStorage.getItem("employess")));
    };
    getEmployees();
  }, [empolyeeData]);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Empolyee
                addEmployee={addEmployee}
                employeeData={empolyeeData}
                handdleDelete={deleteEmployee}
              />
            }
          ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
