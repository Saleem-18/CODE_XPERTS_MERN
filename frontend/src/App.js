import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Dashboard from "./components/Dashboard";
import TodoList from "./components/TodoList";
import CarList from "./components/CarList";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/todos" element={<TodoList />} />
        <Route path="/cars" element={<CarList />} />
      </Routes>
    </Router>
  );
};

export default App;
