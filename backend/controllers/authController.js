const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const path = require("path");
const fs = require("fs");

const parseSkills = (skills) => {
  try {
    return JSON.parse(skills);
  } catch {
    return [skills];
  }
};

exports.register = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword, dob, skills } =
    req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const imagePath = req.file ? req.file.path : null;

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      dob,
      skills: parseSkills(skills),
      image: imagePath,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Helper function to save image ( using local storage)
const saveImage = (image) => {
  const imagePath = path.join(__dirname, "uploads", image.name);
  fs.writeFileSync(imagePath, image.data);
  return imagePath;
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
