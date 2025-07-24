import { useState } from "react";
import { loginUser } from "../api/auth";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await loginUser(email, password);

      // Mark user as logged in
      localStorage.setItem("loggedIn", "true");

      setMessage(res);

      // Clear the form fields
      setEmail("");
      setPassword("");

      // Redirect to Home
      navigate("/");
    } catch (err) {
      setMessage("Login failed: " + err.message);

      // Clear fields even if login fails
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="page-container">
      <h2>Login</h2>
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Login;
