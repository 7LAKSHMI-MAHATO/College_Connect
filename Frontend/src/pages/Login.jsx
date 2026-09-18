import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
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
      console.log("Login error:", error.response?.data);

      alert(
        error.response?.data?.message || "Login failed"
      );
    }
  };

  return (
    <div>
      <h1>College Connect</h1>

      <h2>Login</h2>

      <form onSubmit={handleLogin}>

        <div>
          <label>Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit">
          Login
        </button>

      </form>
    </div>
  );
}

export default Login;