import React, { useState, useEffect } from "react";
import api, { apiCall } from "../api";
import { Navigate } from "react-router-dom";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodoText, setNewTodoText] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsAuthenticated(false);
    } else {
      const fetchTodos = async () => {
        try {
          const response = await await apiCall("/todos", null, "GET");
          setTodos(response.data);
        } catch (error) {
          console.error("Failed to fetch todos", error);
        }
      };

      fetchTodos();
    }
  }, []);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleAddTodo = async () => {
    try {
      if (newTodoText) {
        const response = await apiCall("/todos", { text: newTodoText });
        setTodos([...todos, response.data]);
        setNewTodoText("");
      }
    } catch (error) {
      console.error("Failed to add todo", error);
    }
  };

  const handleCheck = async (id, isCompleted) => {
    try {
      await apiCall(`/todos/${id}`, { isCompleted: !isCompleted }, "PUT");
      const updatedTodos = todos.map((todo) =>
        todo._id === id ? { ...todo, isCompleted: !isCompleted } : todo
      );
      setTodos(updatedTodos.sort((a, b) => (b.isCompleted ? 1 : -1)));
    } catch (error) {
      console.error("Failed to update todo", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await apiCall(`/todos/${id}`, {}, "DELETE");
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("Failed to delete todo", error);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        margin: 0,
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f4f4f4",
        overflow: "auto",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "20px",
          fontSize: "24px",
          wordWrap: "break-word",
        }}
      >
        Your To-Do List
      </h2>

      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          gap: "10px",
          width: "100%",
          maxWidth: "600px",
        }}
      >
        <input
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          placeholder="Enter a new to-do"
          style={{
            padding: "12px",
            width: "100%",
            borderRadius: "4px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        />
        <button
          onClick={handleAddTodo}
          style={{
            padding: "3px 5px",
            backgroundColor: "#4CAF50",
            color: "#fff",
            border: "none",
            borderRadius: "2px",
            cursor: "pointer",
            fontSize: "16px",
            minWidth: "30px",
          }}
        >
          Add Todo
        </button>
      </div>

      <ul
        style={{
          listStyleType: "none",
          padding: "0",
          width: "100%",
          maxWidth: "600px",
        }}
      >
        {todos.map((todo, index) => (
          <li
            key={todo._id}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "15px",
              margin: "5px 0",
              borderRadius: "4px",
              backgroundColor: todo.isCompleted ? "#d3ffd3" : "#fff",
              boxShadow: todo.isCompleted
                ? "0 0 10px rgba(0, 128, 0, 0.2)"
                : "none",
              transition: "all 0.3s ease",
              order: todo.isCompleted ? 2 : index,
            }}
          >
            <input
              type="checkbox"
              checked={todo.isCompleted}
              onChange={() => handleCheck(todo._id, todo.isCompleted)}
              style={{
                marginRight: "15px",
                width: "20px",
                height: "20px",
              }}
            />
            <span
              style={{
                flex: "1",
                textDecoration: todo.isCompleted ? "line-through" : "none",
                fontWeight: todo.isCompleted ? "normal" : "bold",
                fontSize: "16px",
                wordWrap: "break-word",
              }}
            >
              {todo.text}
            </span>
            <button
              onClick={() => handleDelete(todo._id)}
              style={{
                padding: "4px 8px",
                backgroundColor: "#f44336",
                color: "#fff",
                border: "none",
                borderRadius: "50%",
                cursor: "pointer",
                fontSize: "12px",
                width: "24px",
                height: "24px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              ✖
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
