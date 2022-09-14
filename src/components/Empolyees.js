import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Employee from "./Employee";

const Empolyee = ({
  employeeData,
  handleDelete,
  handleUpdate,
  setEmployee,
}) => {
  const navigate = useNavigate();

  const handleForm = () => {
    navigate("/add-employee");
  };

  return (
    <div className="container">
      <h1>Employees Data</h1>

      <button onClick={handleForm}>ADD NEW</button>
      <div>
        {employeeData.length > 0 && (
          <ul>
            <li>
              <h3>Name</h3>
            </li>
            <li>
              <h3>Age</h3>
            </li>
            <li>
              <h3>Salary</h3>
            </li>
            <li>
              <h3>Actions</h3>
            </li>
          </ul>
        )}

        {employeeData.length > 0 ? (
          employeeData.map((employee, index) => (
            <Employee
              key={employee.id ? employee.id : index}
              employee={employee}
              handleDelete={handleDelete}
              handleUpdate={handleUpdate}
              setEmployee={setEmployee}
            />
          ))
        ) : (
          <>
            <h4>No Data to Display</h4>
            <p>Add employee details</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Empolyee;
