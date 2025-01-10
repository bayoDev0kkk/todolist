import React, { useState } from "react";
import { Todo } from "../models/todo-model";
import { Box, Button, Checkbox, TextField } from "@mui/material";



interface TodoProps {
  todo: Todo;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
  onEdit: (id: string, newTitle: string) => void;
}

const TodoComponent: React.FC<TodoProps> = ({ todo, onDelete, onToggle, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempTitle, setTempTitle] = useState(todo.title);

  const handleSave = () => {
    if (tempTitle.trim()) {
      onEdit(todo.id, tempTitle);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setTempTitle(todo.title);
    setIsEditing(false);
  };

  return (
    <Box display="flex" alignItems="center" gap={2} marginY={1}>
      <Checkbox checked={todo.completed} onChange={() => onToggle(todo.id)} />
      {isEditing ? (
        <>
          <TextField
            value={tempTitle}
            onChange={(e) => setTempTitle(e.target.value)}
            fullWidth
          />
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleCancel}>
            Cancel
          </Button>
        </>
      ) : (
        <>
          <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
            {todo.title}
          </span>
          <Button variant="text" onClick={() => setIsEditing(true)}>
            Edit
          </Button>
          <Button variant="text" color="error" onClick={() => onDelete(todo.id)}>
            Delete
          </Button>
        </>
      )}
    </Box>
  );
};


export default TodoComponent;