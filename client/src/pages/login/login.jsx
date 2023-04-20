import React, { useState } from "react";
import axios from "axios";
import "./login.css";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";


const Login = ({ setIsLoggedIn }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const { username, password } = formData;
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const saltRounds = 7;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    //todo brcypted salting
      const { data } = await axios.post( "/login", { username, password });
      // const response = await fetch("http://localhost:5001/razorpay", {
      console.log(data);
      localStorage.setItem("loggedInUser", JSON.stringify(data)); 
      setIsLoggedIn(true);
      navigate("/admin");
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-header">Admin Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
