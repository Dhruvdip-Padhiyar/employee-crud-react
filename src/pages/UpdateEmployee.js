import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateEmployee = ({ updateEmployee, getEmployee }) => {
  const [employee, setEmployee] = useState({});

  const nameRef = useRef(employee.name);
  const ageRef = useRef(employee.age);
  const salaryRef = useRef(employee.salary);

  const navigate = useNavigate();
  const params = useParams();

  const handleUpdate = (event) => {
    event.preventDefault();
    const name = nameRef.current.value;
    const age = ageRef.current.value;
    const salary = salaryRef.current.value;

    if (!name || !age || !salary) {
      return window.alert("All field are required");
    }
    if (name.length < 3) {
      return window.alert("name should have minimum langth of 3");
    }
    if (age.length !== 2) {
      return window.alert("Age should have minimum and maximum langth of 2");
    }
    updateEmployee(employee.id, {
      name: name,
      age: age,
      salary: salary,
    });
    window.alert("Employee updateded successfully...");
    navigate("/");
  };

  const fetchEmployee = async () => {
    const employeeData = await getEmployee(params.id);
    setEmployee(employeeData);
  };
  useEffect(() => {
    fetchEmployee(params.id);
  }, [params.id]);

  if (!employee || Object.keys(employee).length === 0)
    return (
      <div className="container">
        <h1 className="loading">PLease wait...</h1>
      </div>
    );

  return (
    <div className="container">
      <button onClick={() => navigate(-1)}>Back</button>
      <form onSubmit={handleUpdate} className="form">
        <div className="form_field">
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            ref={nameRef}
            defaultValue={employee.name}
          />
        </div>
        <div className="form_field">
          <label>Age</label>
          <input
            type="number"
            placeholder="Enter age"
            ref={ageRef}
            defaultValue={employee.age}
          />
        </div>
        <div className="form_field">
          <label>Salary</label>
          <input
            type="number"
            defaultValue={employee.salary}
            placeholder="Enter salary"
            ref={salaryRef}
          />
        </div>
        <button type="submit" onClick={handleUpdate}>
          UPDATE
        </button>
      </form>
      <button onClick={() => navigate("/")}> Display Employees</button>
    </div>
  );
};

export default UpdateEmployee;
