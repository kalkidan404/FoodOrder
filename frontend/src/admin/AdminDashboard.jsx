import { Link } from "react-router-dom";
import "../styles/AdminDashboard.css";
function AdminDashboard() {
  return (
  <main className="admin-dashboard-page">
    <div className="admin-dashboard-container">
      <div className="admin-dashboard-header">
        <p>ADMIN PANEL</p>
        <h1>Admin Dashboard</h1>
        <span>Manage your FoodOrder platform.</span>
      </div>

      <div className="admin-dashboard-cards">
        <Link to="/admin/foods" className="admin-dashboard-card">
          <div className="admin-card-icon">🍔</div>
          <h2>Foods</h2>
          <p>Add, manage and remove foods.</p>
          <span>Manage Foods →</span>
        </Link>

        <Link to="/admin/orders" className="admin-dashboard-card">
          <div className="admin-card-icon">📦</div>
          <h2>Orders</h2>
          <p>View orders and update their status.</p>
          <span>Manage Orders →</span>
        </Link>

        <Link
          to="/admin/restaurants"
          className="admin-dashboard-card"
        >
          <div className="admin-card-icon">🏪</div>
          <h2>Restaurants</h2>
          <p>Add, manage and remove restaurants.</p>
          <span>Manage Restaurants →</span>
        </Link>
      </div>
    </div>
  </main>
);
}

export default AdminDashboard;