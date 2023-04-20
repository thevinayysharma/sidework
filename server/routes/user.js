import express from "express";
const router = express.Router();
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Load input validation
// const validateLoginInput = require("../../validation/login");
app.post("/login", async (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username: req.body.username }); // assuming the username is provided in the request body

    if (!user) {
      console.log("Invalid login credentials");
      return res.status(401).json({ error: "Invalid login credentials" });
    }

    const passwordMatches = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!passwordMatches) {
      console.log("Invalid login credentials");
      return res.status(401).json({ error: "Invalid login credentials" });
    }

    console.log("User authenticated:", user);
    res.json(user);
  } catch (err) {
    console.log("Error finding user:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
