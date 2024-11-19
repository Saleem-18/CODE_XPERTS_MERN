const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
  dob: Date,
  skills: [String],
  image: String,
});

module.exports = mongoose.model("User", UserSchema);
