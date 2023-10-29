import React, { Suspense, useState, useEffect } from "react";
import LoginPage from "./containers/Login/Login";

import axios from "axios";
import TaskTable from "./components/TaskTable";
import Taskbar from "./components/Taskbar";
import Invite from "./components/Invite";
import { Routes, Route } from "react-router-dom";

function Container() {
  const token = localStorage.getItem("token");
  const [message, setMessage] = useState(false);
  const isGoogle = localStorage.getItem("google");
  const [tasks, setTasks] = useState([]);

  const getUser = async () => {
    const url = "http://localhost:3000/login/getuser";

    const { data } = await axios.post(url, { token, isGoogle });
    console.log(data)
    if (data.message === "success") {}
  };

  useEffect(() => {
    if (token) {
      getUser();
    }
  }, []);
  return (
    <>
      {token ? (
        <>
          <Taskbar />
          <Routes>
            <Route path="/add" element={<Invite />} />
            <Route
              path="/"
              element={<TaskTable tasks={tasks} setTasks={setTasks} />}
            />
            <Route />
            <Route />
          </Routes>
        </>
      ) : (
        <LoginPage />
      )}
    </>
  );
}

export default Container;
