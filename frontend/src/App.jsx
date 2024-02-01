import { useEffect, useState } from "react";
import Card from "./Card";

function App() {
  const [employees, setEmployees] = useState([]);
  // const [category, setCategory] = useState("");
  // const [salary, setSalary] = useState(0);
  const [newEmployee, setNewEmployee] = useState({
    id: "",
    name: "",
    age: "",
    category: "",
    salary: "",
  });

  useEffect(() => {
    const getAllEmployees = async () => {
      try {
        const res = await fetch("http://localhost:7000/allEmployees");
        const data = await res.json();
        console.log(data);

        setEmployees(data);
      } catch (err) {
        console.log(err);
      }
    };

    getAllEmployees();
  }, []);

  // const userEmployee = async () => {
  //   try {
  //     const res = await fetch("http://localhost:7000/specificEmployee", {
  //       method: "POST",
  //       headers: {
  //         "Content-type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         category,
  //         salary,
  //       }),
  //     });

  //     const data = await res.json();
  //     setEmployees(data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee((prev) => ({
      ...prev,
      [name]:
        name === "salary" || name === "age" || name === "id"
          ? Number(value)
          : value,
    }));
  };

  const createEmployee = async () => {
    try {
      const res = await fetch("http://localhost:7000/create", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(newEmployee),
      });

      console.log(res);
      // const data = await res.json();
      // console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h1>Hello World</h1>
      <div className="container">
        {employees.map((employee) => (
          <Card
            key={employee.id}
            id={employee.id}
            name={employee.Name}
            salary={employee.salary}
            age={employee.age}
            category={employee.category}
          />
        ))}
      </div>

      {/* <input
        type="text"
        placeholder="employee category"
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      />
      <input
        type="number"
        placeholder="employee salary"
        value={salary}
        onChange={(e) => {
          setSalary(Number(e.target.value));
        }}
      />
      <button onClick={userEmployee}>Get Employee</button> */}

      <input
        type="text"
        placeholder="name"
        value={newEmployee.name}
        name="name"
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="salary"
        value={newEmployee.salary}
        name="salary"
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="id"
        value={newEmployee.id}
        name="id"
        onChange={handleChange}
      />
      <input
        type="category"
        placeholder="category"
        value={newEmployee.category}
        name="category"
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="age"
        value={newEmployee.age}
        name="age"
        onChange={handleChange}
      />

      <button onClick={createEmployee}>Create Employee</button>
    </>
  );
}

export default App;
