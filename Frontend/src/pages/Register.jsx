import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        {
          name,
          email,
          password
        }
      );

      console.log("Registration response:", response.data);

      alert("Registration successful");

      navigate("/login");

    } catch (error) {
      console.log(
        "Registration error:",
        error.response?.data
      );

      alert(
        error.response?.data?.message ||
        "Registration failed"
      );
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        <h1>College Connect</h1>

        <p className="auth-subtitle">
          Create your student account
        </p>

        <h2>Register</h2>

        <form onSubmit={handleRegister}>

          <div className="form-group">
            <label>Name</label>

            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>


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
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>


          <button
            type="submit"
            className="btn btn-primary auth-button"
          >
            Register
          </button>

        </form>


        <p className="auth-footer">
          Already have an account?{" "}
          <Link to="/login">
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Register;