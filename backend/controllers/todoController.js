const Todo = require("../models/Todo");

// Create a to-do
exports.createTodo = async (req, res) => {
  const { text } = req.body;
  const userId = req.userId;

  try {
    const newTodo = new Todo({ text, user: userId });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Get all todos of a user
exports.getTodos = async (req, res) => {
  const userId = req.userId;

  try {
    const todos = await Todo.find({ user: userId });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete a to-do
exports.deleteTodo = async (req, res) => {
  const { todoId } = req.params;

  try {
    await Todo.findByIdAndDelete(todoId);
    res.json({ message: "Todo deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Update a todo's completion status
exports.updateTodo = async (req, res) => {
  const { todoId } = req.params;
  const { isCompleted } = req.body;

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      todoId,
      { isCompleted },
      { new: true }
    );
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
