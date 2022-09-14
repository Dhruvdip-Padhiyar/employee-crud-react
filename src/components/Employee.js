import React from "react";
import { useNavigate } from "react-router-dom";

const Employee = ({ employee, handleDelete }) => {
  const navigate = useNavigate();
  const deleteEmployee = () => {
    if (!window.confirm(`Delete ${employee.name}....`)) {
      return;
    }
    handleDelete(employee.id);
  };
  const updateEmployee = () => {
    navigate(`/update-employee/${employee.id}`);
  };
  return (
    <>
      <div className="emp_data">
        <span>{employee.name}</span>
        <span>{employee.age}</span>
        <span>Rs. {employee.salary}</span>
        <div>
          <button className="action_btn" onClick={updateEmployee}>
            Update
          </button>
          <button className="action_btn" onClick={deleteEmployee}>
            Delete
          </button>
        </div>
      </div>
      <hr />
    </>
  );
};

export default Employee;
