import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

const AddEmployee = ({ addEmployee }) => {
  const nameRef = useRef("");
  const ageRef = useRef("");
  const salaryRef = useRef("");

  const navigate = useNavigate();

  const handleRegister = (event) => {
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
    addEmployee({
      name: name,
      age: age,
      salary: salary,
    });

    nameRef.current.value = null;
    ageRef.current.value = null;
    salaryRef.current.value = null;
    window.alert("Employee added...");
  };

  return (
    <div className="container">
      <button onClick={() => navigate(-1)}>Back</button>
      <form onSubmit={handleRegister} className="form">
        <div className="form_field">
          <label>Name</label>
          <input type="text" placeholder="Enter employee name" ref={nameRef} />
        </div>
        <div className="form_field">
          <label>Age</label>
          <input type="number" placeholder="Enter employee age" ref={ageRef} />
        </div>
        <div className="form_field">
          <label>Salary</label>
          <input
            type="number"
            placeholder="Enter employee salary"
            ref={salaryRef}
          />
        </div>
        <button type="submit">ADD</button>
      </form>
      <button onClick={() => navigate("/")}> Display Employees</button>
    </div>
  );
};

export default AddEmployee;
