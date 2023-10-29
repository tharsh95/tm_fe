import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const Task = ({ task }) => {
  return (
    <ListItem>
      <ListItemText primary={task.title} secondary={task.description} />
      {/* Add any additional task details or buttons here */}
    </ListItem>
  );
};

export default Task;
