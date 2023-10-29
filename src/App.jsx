import React, { useEffect, useState } from "react";
import TaskTable from "./components/TaskTable";
import { GoogleLogin, googleLogout } from "@react-oauth/google";

import Container from "./Container";
import Invite from "./components/Invite";
const App = () => {
  const [tasks, setTasks] = useState([]);

  return (
    <>
      <Container />
     
    </>
  );
};

export default App;
