import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TodoComponent from "./Todo";
import Counter from "./Counter";
import AddTodo from "./AddTodo";
import { Todo } from "../models/todo-model";
import { v4 as uuidv4 } from "uuid";

const FilterButton = styled.button<{ active: boolean }>`
  font-weight: ${({ active }) => (active ? "bold" : "normal")};
  padding: 10px 15px;
  margin: 5px;
  border: none;
  border-radius: 5px;
  background-color: ${({ active }) => (active ? "#1976d2" : "#f0f0f0")};
  color: ${({ active }) => (active ? "white" : "#000")};
  cursor: pointer;

  &:hover {
    background-color: ${({ active }) => (active ? "#1565c0" : "#e0e0e0")};
  }
`;

const LOCAL_STORAGE_KEY = "todos";

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedTodos) {
      try {
        return JSON.parse(savedTodos);
      } catch (error) {
        console.error("Error parsing todos from Local Storage:", error);
        return [];
      }
    }
    return [];
  });

  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const handleAdd = (title: string) => {
    const newTodo: Todo = { id: uuidv4(), title, completed: false };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const handleDelete = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const handleToggle = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleEdit = (id: string, newTitle: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, title: newTitle } : todo
      )
    );
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return (
    <div>
      <h1>Todo List</h1>
      <Counter count={todos.length} />
      <div>
        <FilterButton
          onClick={() => setFilter("all")}
          active={filter === "all"}
        >
          Show All Tasks
        </FilterButton>
        <FilterButton
          onClick={() => setFilter("active")}
          active={filter === "active"}
        >
          Show Active Tasks
        </FilterButton>
        <FilterButton
          onClick={() => setFilter("completed")}
          active={filter === "completed"}
        >
          Show Completed Tasks
        </FilterButton>
      </div>
      <AddTodo onAdd={handleAdd} />
      {filteredTodos.map((todo) => (
        <TodoComponent
          key={todo.id}
          todo={todo}
          onDelete={handleDelete}
          onToggle={handleToggle}
          onEdit={handleEdit}
        />
      ))}
    </div>
  );
};

export default TodoList;