import React from "react";
import reactDom from "react-dom";
import { Title } from "./Title";
import { GroupList } from "./GroupList";

const Home = () => {
  return (
    <div className="text-center container">
      <Title />
      <GroupList />
    </div>
  );
};

export default Home;
