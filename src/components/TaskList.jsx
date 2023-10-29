import React, { useState } from "react";
import Task from "./Task";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import TaskForm from "./TaskForm";

const TaskList = ({ tasks }) => {
  const [filter, setFilter] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);

  const filteredTasks = tasks.filter(
    (task) =>
      task.status.toLowerCase().includes(filter.toLowerCase()) ||
      task.title.toLowerCase().includes(filter.toLowerCase())
  );

  const groupedTasks = {
    backlog: [],
    wip: [],
    onhold: [],
    completed: [],
  };

  filteredTasks.forEach((task) => {
    const status = task.status.toLowerCase();
    groupedTasks[status].push(task);
  });

  return (
    <div
      style={{
        width: "80vw",
        height: "80vh",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}
      >
        {/* <TextField
          label="Filter by Status or Title"
          variant="outlined"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => setIsFormOpen(!isFormOpen)}
          style={{ marginLeft: "10px" }}
        >
          {isFormOpen ? "Close Form" : "Open Form"}
        </Button> */}
      </div>
      <List>
        {Object.keys(groupedTasks).map((status, index) => (
          <div key={index}>
            <ListItem>
              <ListItemText primary={status.toUpperCase()} />
            </ListItem>
            {groupedTasks[status].map((task, taskIndex) => (
              <Task key={taskIndex} task={task} />
            ))}
          </div>
        ))}
      </List>
    </div>
  );
};

export default TaskList;
