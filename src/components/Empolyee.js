import React, { useState, useRef, useEffect } from "react";

const Empolyee = ({ addEmployee, employeeData, handdleDelete }) => {
  const nameRef = useRef("");
  const ageRef = useRef("");
  const salaryRef = useRef("");

  const allEmpolyees = employeeData.data;
  const handleRegister = (event) => {
    event.preventDefault();
    const name = nameRef.current.value;
    const age = ageRef.current.value;
    const salary = salaryRef.current.value;
    const data = {
      employee_name: name,

      employee_age: age,
      employee_salary: salary,
    };

    console.log(data);
    addEmployee(data);

    nameRef.current.value = null;
    ageRef.current.value = null;
    salaryRef.current.value = null;
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <div>
          <label>Name</label>
          <input type="text" placeholder="Enter your name" ref={nameRef} />
        </div>
        <div>
          <label>Age</label>
          <input type="number" placeholder="Enter your age" ref={ageRef} />
        </div>
        <div>
          <label>Salary</label>
          <input
            type="number"
            placeholder="Enter your salary"
            ref={salaryRef}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <div>
        <ul>
          {allEmpolyees
            ? allEmpolyees.map((employee) => (
                <p key={employee.id}>
                  {employee.employee_name} : {employee.employee_salary}
                  <button onClick={() => handdleDelete(employee.id)}>
                    delete
                  </button>
                </p>
              ))
            : "no employe for display"}
        </ul>
      </div>
    </div>
  );
};

export default Empolyee;
