const express = require("express");
const router = express.Router();
const carController = require("../controllers/carController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, carController.createCar);
router.get("/", authMiddleware, carController.getCars);
router.put("/:carId", authMiddleware, carController.updateCar);
router.delete("/:carId", authMiddleware, carController.deleteCar);

module.exports = router;
