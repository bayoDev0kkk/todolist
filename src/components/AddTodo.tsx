import React, { useState } from "react";
import PropTypes from "prop-types";
import { TextField, Button, Box } from "@mui/material";

interface AddTodoProps {
  onAdd: (title: string) => void;
}

const AddTodo: React.FC<AddTodoProps> = ({ onAdd }) => {
  const [input, setInput] = useState("");

  const handleAdd = () => {
    if (input.trim()) {
      onAdd(input);
      setInput("");
    }
  };

  return (
    <Box display="flex" gap={2} marginY={2}>
      <TextField
        variant="outlined"
        label="New Task"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        fullWidth
      />
      <Button variant="contained" color="primary" onClick={handleAdd}>
        Add
      </Button>
    </Box>
  );
};

AddTodo.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

export default AddTodo;