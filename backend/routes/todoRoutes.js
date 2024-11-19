const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, todoController.createTodo);
router.get("/", authMiddleware, todoController.getTodos);
router.delete("/:todoId", authMiddleware, todoController.deleteTodo);
router.put("/:todoId", authMiddleware, todoController.updateTodo);

module.exports = router;
