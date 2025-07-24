import { useState } from "react";
import { registerUser } from "../api/auth";
import "./Register.css";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      const res = await registerUser(form);
      setMessage(res);
    } catch (err) {
      setMessage("Registration failed: " + err.message);
    }
  };

  return (
    <div className="page-container">
      <h2>Register</h2>
      <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} />
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} />
      <button onClick={handleRegister}>Register</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Register;
