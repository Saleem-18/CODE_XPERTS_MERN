const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  text: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  isCompleted: { type: Boolean, default: false },
});

module.exports = mongoose.model("Todo", TodoSchema);
