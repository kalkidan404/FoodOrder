import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import "../styles/navbar.css";

function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        FoodOrder
      </Link>

      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/foods">Foods</Link>
        <Link to="/restaurants">Restaurants</Link>

        {user ? (
          <>
            <Link to="/cart">Cart</Link>

            <span className="navbar-welcome">
              Welcome, {user.name}
            </span>

            {user.role === "ADMIN" && (
              <Link to="/admin" className="admin-link">
                Admin Dashboard
              </Link>
            )}

            <button onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;