import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button, Grid } from "@mui/material";

const TaskForm = ({ onAddTask }) => {
  const [task, setTask] = useState({ title: "", description: "", status: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleAddTask = () => {

    onAddTask(task);
    setTask({ title: "", description: "", status: "" });
  };

  return (
    <Grid container spacing={2}>
      <Grid item ls={3} md={4}>
        <TextField
          name="title"
          label="Title"
          variant="outlined"
          value={task.title}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item ls={3} md={4}>
        <TextField
          name="description"
          label="Description"
          variant="outlined"
          value={task.description}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item ls={3} md={4}>
        <TextField
          name="status"
          label="Status"
          variant="outlined"
          value={task.status}
          onChange={handleInputChange}
        />
      </Grid>
      <Button variant="contained" color="primary" onClick={handleAddTask}>
        Add Task
      </Button>
    </Grid>
  );
};

export default TaskForm;
