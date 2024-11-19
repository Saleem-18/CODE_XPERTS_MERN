const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

router.post("/register", upload.single("image"), authController.register);
router.post("/login", authController.login);

module.exports = router;
