import React, { useState, useEffect } from "react";
import reactDom from "react-dom";

// fetch('https://playground.4geeks.com/apis/fake/todos/user/luisroldan', {
//       method: "PUT",
//       body: JSON.stringify(todos),
//       headers: {
//         "Content-Type": "application/json"
//       }
//     })
//     .then(resp => {
//         console.log(resp.ok); // Será true (verdad) si la respuesta es exitosa.
//         console.log(resp.status); // el código de estado = 200 o código = 400 etc.
//         console.log(resp.text()); // Intentará devolver el resultado exacto como cadena (string)
//         return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
//     })
//     .then(data => {
//         //Aquí es donde debe comenzar tu código después de que finalice la búsqueda
//         console.log(data); //esto imprimirá en la consola el objeto exacto recibido del servidor
//     })
//     .catch(error => {
//         //manejo de errores
//         console.log(error);
//     });

export const GroupList = () => {
  const [tasks, setTasks] = useState([]);

  const getTodo = async () => {
    const API_URL =
      "https://playground.4geeks.com/apis/fake/todos/user/luisroldan";
    const options = {
      method: "GET",
    };
    const response = await fetch(API_URL, options);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setList(data);
    } else {
      return "Error: ", response.status, response.statusText;
    }
  };

  const updateTask = async (newTasks) => {
    const API_URL =
      "https://playground.4geeks.com/apis/fake/todos/user/luisroldan";
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTasks),
    };
    const response = await fetch(API_URL, options);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
    } else {
      return "Error: ", response.status, response.statusText;
    }
  };

  const handleClick = (index) => {
    let newTasks = [...tasks];
    newTasks.splice(index, 1);
    updateTask(newTasks);
    setTasks(newTasks);
  };
  const handleKeyUp = (e) => {
    if (e.code === "Enter") {
      const inputValue = e.target.value.trim();
      if (inputValue !== "") {
        setTasks([...tasks, inputValue]);
        e.target.value = "";
      }
    }
  };

  useEffect(() => {
    getTodo();
  }, []);

  return (
    <div className="text-center">
      <input className="input" type="text" onKeyUp={handleKeyUp} />
      <ul className="list-group">
        {tasks.length === 0
          ? "No tasks, add a task"
          : tasks.map((t, index) => (
              <li className="list-group-item list-group-item-light">
                {t}
                <div
                  className="buttonX"
                  onClick={() => handleClick(index)}
                  key={index}
                >
                  x
                </div>
              </li>
            ))}
      </ul>
      <div className="list-group-item list-group-item-light itemsLeft">
        {tasks.length} items left
      </div>
    </div>
  );
};
