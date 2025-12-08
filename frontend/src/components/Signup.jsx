import React, { useState } from "react";
import "../App.css";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "./Navbar";

function Signup() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  });

  const categories = [
    "Fiction",
    "Fantasy",
    "Romance",
    "Mystery",
    "Science Fiction",
    "Non-Fiction",
    "Biography",
    "Self-Help",
    "Children"
  ];
  const navigate = useNavigate();

  const [message, setMessage] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch("http://localhost:3000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    const data = await res.json();

    if (res.ok) {
      setTimeout(() => {
        navigate("/login");
      }, 1000);
      setMessage("Account created! You can now login.");
    } else {
      setMessage(data.error || "Signup failed.");
    }
  }

  return (
    <>
      <Navbar />

      <div className="auth-container" >
        <h2>Create Account</h2>

        <form onSubmit={handleSubmit}>
          <input
            name="username"
            type="text"
            placeholder="Username"
            onChange={handleChange}
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />

          <select name="favorite_category" onChange={handleChange} required>
            <option value="">Select Favorite Category</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <button type="submit">Sign Up</button>


        </form>
        <p className="auth-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
        {message && <p className="auth-message"> {message}</p>}
      </div>
    </>
  );
}

export default Signup;
