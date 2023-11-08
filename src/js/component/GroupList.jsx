import React, { useState } from "react";
import reactDom from "react-dom";

export const GroupList = () => {
  const [tasks, setTasks] = useState([]);
  const handleClick = (index) => {
    let newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };
  return (
    <div className="text-center">
      <input
        className="input"
        type="text"
        onKeyUp={(e) =>
          e.keyCode === 13 && setTasks([...tasks, e.target.value])
        }
      />
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
