import { useContext, useState } from "react";
 import { Link, useNavigate } from "react-router-dom";
  import { AuthContext } from "../context/authContext";
  import "../styles/auth.css";
   function Login() {
     const { login } = useContext(AuthContext);
      const navigate = useNavigate();
       const [email, setEmail] = useState("");
        const [password, setPassword] = useState(""); 
        const [error, setError] = useState(""); 
        const handleSubmit = async (event) => { 
          event.preventDefault();
           try {
             setError("");
              await login(email, password); 
              navigate("/"); 
            } catch (error) { 
              setError( error.response?.data?.message || "Login failed" );
             } }; 
             return (
  <main className="login-page">
    <div className="login-card">

      <h1>Welcome Back</h1>

      <p className="login-subtitle">
        Login to your FoodOrder account
      </p>

      {error && (
        <p className="login-error">
          {error}
        </p>
      )}

      <form
        className="login-form"
        onSubmit={handleSubmit}
      >
        <div className="login-field">
          <label>Email</label>

          <input
            type="email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
          />
        </div>

        <div className="login-field">
          <label>Password</label>

          <input
            type="password"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
          />
        </div>

        <button
          className="login-button"
          type="submit"
        >
          Login
        </button>
      </form>

      <p className="login-register">
        Don't have an account?{" "}
        <Link to="/register">
          Register
        </Link>
      </p>

    </div>
  </main>
);
   }
export default Login;