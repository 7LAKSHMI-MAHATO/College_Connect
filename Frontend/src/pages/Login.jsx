import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        {
          email,
          password
        }
      );

      console.log("Login response:", response.data);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.user.role);

      alert("Login successful");

      if (response.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }

    } catch (error) {
      console.log(
        "Login error:",
        error.response?.data
      );

      alert(
        error.response?.data?.message ||
        "Login failed"
      );
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        <h1>College Connect</h1>

        <p className="auth-subtitle">
          College Campus Management Platform
        </p>

        <h2>Login</h2>

        <form onSubmit={handleLogin}>

          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>


          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>


          <button
            type="submit"
            className="btn btn-primary auth-button"
          >
            Login
          </button>

        </form>


        <p className="auth-footer">
          Don't have an account?{" "}
          <Link to="/register">
            Register
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Login;