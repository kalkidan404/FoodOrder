import { useEffect, useState } from "react";
import api from "../api/api";
import "../styles/AdminOrders.css";
function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getOrders = async () => {
      try {
        setLoading(true);

        const response = await api.get("/admin/orders");

        setOrders(response.data.orders);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getOrders();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/admin/orders/${id}`, { status });

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === id ? { ...order, status } : order
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
  <main className="admin-orders-page">
    <div className="admin-orders-container">

      <div className="admin-page-header">
        <p>ORDER MANAGEMENT</p>
        <h1>Orders</h1>
        <span>View orders and keep their status updated.</span>
      </div>

      {loading && (
        <p className="admin-loading">Loading...</p>
      )}

      <div className="admin-orders-list">
        {orders.map((order) => (
          <div className="admin-order-card" key={order.id}>

            <div className="admin-order-info">
              <h2>Order #{order.id}</h2>
              <p>
                Current status:{" "}
                <strong>{order.status}</strong>
              </p>
            </div>

            <div className="admin-order-status">
              <label>Status</label>

              <select
                value={order.status}
                onChange={(e) =>
                  updateStatus(
                    order.id,
                    e.target.value
                  )
                }
              >
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="confirmed">Confirmed</option>
                <option value="preparing">Preparing</option>
                <option value="ready">Ready</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

          </div>
        ))}
      </div>

    </div>
  </main>
);
}

export default AdminOrders;