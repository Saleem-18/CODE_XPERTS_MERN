import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsAuthenticated(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Welcome to Your Dashboard!</h2>
        <p>Manage your tasks lists and car CRUDs here.</p>
      </div>
      <nav className="dashboard-nav">
        <ul>
          <li>
            <Link to="/todos" className="nav-link">
              To-Do List
            </Link>
          </li>
          <li>
            <Link to="/cars" className="nav-link">
              Car List
            </Link>
          </li>
        </ul>
      </nav>
      {/* Logout Button */}
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
