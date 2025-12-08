import React, { useState } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      setMessage("Login successful!");

      // redirect user
      window.location.href = "/"; 
    } else {
      setMessage(data.error || "Login failed.");
    }
  }

  return (
    <>
    <Navbar />

    <div className="auth-container" >
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
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

        <button type="submit">Login</button>
      </form>
      <p className="auth-link">
          Don't have an account? <Link to="/signup">SignUp</Link>
        </p>

      {message && <p className="auth-message"> {message}</p>}
    </div>
    </>
  );
}

export default Login;
