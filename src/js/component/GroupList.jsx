import React, { useState, useEffect } from "react";
import reactDom from "react-dom";

export const GroupList = () => {
  const [taskList, setTaskList] = useState([]);

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
      setTaskList(data);
    } else {
      createUser();
      getTodo();
      return "Error: ", response.status, response.statusText;
    }
  };

  const updateTask = async (newTask, createUser, getTodo) => {
    const API_URL =
      "https://playground.4geeks.com/apis/fake/todos/user/luisroldan";
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
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
    let newTasks = [...taskList];
    newTasks.splice(index, 1);
    setTaskList(newTasks);
    updateTask(newTasks);
  };

  const handleKeyUp = async (e) => {
    if (e.code === "Enter") {
      const inputValue = e.target.value.trim();
      if (inputValue !== "") {
        const newTask = { label: inputValue, done: false };
        updateTask([...taskList, newTask]);
        setTaskList([...taskList, newTask]);
        e.target.value = "";
      }
    }
  };

  const deleteUser = async () => {
    const API_URL =
      "https://playground.4geeks.com/apis/fake/todos/user/luisroldan";
    const options = {
      method: "DELETE",
    };
    const response = await fetch(API_URL, options);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      // createUser();
      getTodo();
    } else {
      console.error("Error:", response.status, response.statusText);
    }
  };

  const createUser = async () => {
    const API_URL =
      "https://playground.4geeks.com/apis/fake/todos/user/luisroldan";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([]),
    };

    try {
      const response = await fetch(API_URL, options);
      if (response.ok) {
        const data = await response.json();
        console.log("Usuario creado:", data);
        getTodo();
      } else {
        console.error(
          "Error al crear el usuario:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  useEffect(() => {
    getTodo();
  }, []);

  return (
    <div className="text-center">
      <input className="input" type="text" onKeyUp={handleKeyUp} />
      <ul className="list-group">
        {taskList.length === 0
          ? "No tasks, add a task"
          : taskList.map((t, index) => (
              <li className="list-group-item list-group-item-light">
                {t.label}
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
      <button onClick={deleteUser}>Clear all tasks</button>
      <div className="list-group-item list-group-item-light itemsLeft">
        {taskList.length} items left
      </div>
    </div>
  );
};
