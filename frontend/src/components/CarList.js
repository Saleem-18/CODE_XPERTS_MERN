import React, { useState, useEffect } from "react";
import api, { apiCall } from "../api";
import { Navigate } from "react-router-dom";

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [newCar, setNewCar] = useState({ name: "", model: "", price: "" });
  const [editingCar, setEditingCar] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsAuthenticated(false);
    } else {
      const fetchCars = async () => {
        try {
          const response = await apiCall("/cars", null, "GET");
          setCars(response.data);
        } catch (error) {
          console.error("Failed to fetch cars", error);
        }
      };

      fetchCars();
    }
  }, []);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  const handleAddCar = async () => {
    try {
      const response = await apiCall("/cars", newCar);
      setCars([...cars, response.data]);
      setNewCar({ name: "", model: "", price: "" });
    } catch (error) {
      console.error("Failed to add car", error);
    }
  };

  const handleDeleteCar = async (id) => {
    try {
      await apiCall(`/cars/${id}`, {}, "DELETE");
      setCars(cars.filter((car) => car._id !== id));
    } catch (error) {
      console.error("Failed to delete car", error);
    }
  };

  const handleUpdateCar = async () => {
    try {
      const response = await apiCall(
        `/cars/${editingCar._id}`,
        editingCar,
        "PUT"
      );
      setCars(
        cars.map((car) => (car._id === editingCar._id ? response.data : car))
      );
      setEditingCar(null); // Reset editing mode
    } catch (error) {
      console.error("Failed to update car", error);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Your Cars</h2>
      <div
        style={{ marginBottom: "20px", display: "flex", alignItems: "center" }}
      >
        <input
          type="text"
          placeholder="Car Name"
          value={newCar.name}
          onChange={(e) => setNewCar({ ...newCar, name: e.target.value })}
          style={{
            padding: "6px 12px",
            marginRight: "10px",
            borderRadius: "5px",
            width: "150px",
          }}
        />
        <input
          type="text"
          placeholder="Car Model"
          value={newCar.model}
          onChange={(e) => setNewCar({ ...newCar, model: e.target.value })}
          style={{
            padding: "6px 12px",
            marginRight: "10px",
            borderRadius: "5px",
            width: "150px",
          }}
        />
        <input
          type="number"
          placeholder="Car Price"
          value={newCar.price}
          onChange={(e) => setNewCar({ ...newCar, price: e.target.value })}
          style={{
            padding: "6px 12px",
            marginRight: "10px",
            borderRadius: "5px",
            width: "100px",
          }}
        />
        <button
          onClick={handleAddCar}
          style={{
            padding: "6px 12px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          Add Car
        </button>
      </div>

      <ul style={{ listStyleType: "none", padding: "0" }}>
        {cars.map((car) => (
          <li
            key={car._id}
            style={{
              backgroundColor: "#f9f9f9",
              padding: "10px",
              margin: "10px 0",
              borderRadius: "8px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <span>
              {car.name} - {car.model} - ${car.price}
            </span>
            <div>
              <button
                onClick={() => setEditingCar(car)}
                style={{
                  padding: "5px 10px",
                  marginRight: "10px",
                  backgroundColor: "#FFC107",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "12px",
                }}
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteCar(car._id)}
                style={{
                  padding: "5px 10px",
                  backgroundColor: "#f44336",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "12px",
                }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      {editingCar && (
        <div style={{ marginTop: "20px" }}>
          <h3>Edit Car</h3>
          <div
            style={{
              marginBottom: "15px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <input
              type="text"
              placeholder="Car Name"
              value={editingCar.name}
              onChange={(e) =>
                setEditingCar({ ...editingCar, name: e.target.value })
              }
              style={{
                padding: "6px 12px",
                marginRight: "10px",
                borderRadius: "5px",
                width: "150px",
              }}
            />
            <input
              type="text"
              placeholder="Car Model"
              value={editingCar.model}
              onChange={(e) =>
                setEditingCar({ ...editingCar, model: e.target.value })
              }
              style={{
                padding: "6px 12px",
                marginRight: "10px",
                borderRadius: "5px",
                width: "150px",
              }}
            />
            <input
              type="number"
              placeholder="Car Price"
              value={editingCar.price}
              onChange={(e) =>
                setEditingCar({ ...editingCar, price: e.target.value })
              }
              style={{
                padding: "6px 12px",
                marginRight: "10px",
                borderRadius: "5px",
                width: "100px",
              }}
            />
            <button
              onClick={handleUpdateCar}
              style={{
                padding: "6px 12px",
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              Update
            </button>
            <button
              onClick={() => setEditingCar(null)}
              style={{
                padding: "6px 12px",
                backgroundColor: "#f44336",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "14px",
                marginLeft: "10px",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarList;
