const Car = require("../models/Car");

// Create a car
exports.createCar = async (req, res) => {
  const { name, model, price } = req.body;
  const userId = req.userId;

  try {
    const newCar = new Car({ name, model, price, owner: userId });
    await newCar.save();
    res.status(201).json(newCar);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Get all cars of the user
exports.getCars = async (req, res) => {
  const userId = req.userId;

  try {
    const cars = await Car.find({ owner: userId });
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Update a car
exports.updateCar = async (req, res) => {
  const { carId } = req.params;
  const { name, model, price } = req.body;

  try {
    const updatedCar = await Car.findByIdAndUpdate(
      carId,
      { name, model, price },
      { new: true }
    );
    res.json(updatedCar);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete a car
exports.deleteCar = async (req, res) => {
  const { carId } = req.params;

  try {
    const car = await Car.findByIdAndDelete(carId);

    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.json({ message: "Car deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
