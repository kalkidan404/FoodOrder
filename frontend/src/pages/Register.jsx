
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../context/authContext";
import "../styles/Register.css";
function Register() {
  const { register } = useContext(AuthContext);

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setError("");

      await register(name, email, password);

      navigate("/login");
    } catch (error) {
      setError(
        error.response?.data?.message || "Registration failed"
      );
    }
  };

  return (
  <main className="register-page">
    <div className="register-card">
      <h1>Create Account</h1>
      <p className="register-subtitle">
        Create your FoodOrder account
      </p>

      {error && <p className="register-error">{error}</p>}

      <form className="register-form" onSubmit={handleSubmit}>
        <div className="register-field">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>

        <div className="register-field">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <div className="register-field">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <button className="register-button" type="submit">
          Register
        </button>
      </form>

      <p className="register-login">
        Already have an account?{" "}
        <Link to="/login">Login</Link>
      </p>
    </div>
  </main>
);
}

export default Register;
