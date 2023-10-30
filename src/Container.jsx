import React, { Suspense, useState, useEffect } from "react";
import LoginPage from "./containers/Login/Login";

import axios from "axios";
import TaskTable from "./components/TaskTable";
import Taskbar from "./components/Taskbar";
import Invite from "./components/Invite";
import { Routes, Route } from "react-router-dom";
import { useUserContext } from "./Contexts/userContext";
import Profile from "./components/Profile";
import Trash from "./components/Trash";
function Container() {
  const token = localStorage.getItem("token");
  const isGoogle = localStorage.getItem("google");
  const [tasks, setTasks] = useState([]);
  const { user, setUser } = useUserContext();

  const getUser = async () => {
    const url = "http://localhost:3000/login/getuser";

    try {
      const {
        data: {
          data: { data },
        },
      } = await axios.post(url, { token, isGoogle });
      setUser(data);
    } catch (error) {
      console.error("Error getting user data:", error);
    }
  };

  useEffect(() => {
    if (token) {
      getUser();
    }
  }, [token, isGoogle, setUser]);
  return (
    <>
      {token ? (
        <>
          <Taskbar />
          <Routes>
            {user?.role === "Manager" && (<>
              <Route path="/add" element={<Invite />} />
              <Route path="/trash" element={<Trash />} />
              </>
            )}
            <Route
              path="/"
              element={<TaskTable tasks={tasks} setTasks={setTasks} />}
            />
            <Route path="/profile" element={<Profile />} />
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
