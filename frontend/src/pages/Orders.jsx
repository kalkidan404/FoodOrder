
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import "../styles/orders.css";
function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await api.get("/orders");

        setOrders(response.data.orders);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getOrders();
  }, []);

  const cancelOrder = async (id) => {
    try {
      const response = await api.delete(`/orders/${id}`);

      setOrders((currentOrders) =>
        currentOrders.map((order) =>
          order.id === id
            ? { ...order, status: "cancelled" }
            : order
        )
      );
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message || "Failed to cancel order"
      );
    }
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
  <main className="orders-page">
    <div className="orders-container">

      <div className="orders-header">
        <h1>My Orders</h1>
        <p>Track and manage your previous orders.</p>
      </div>

      {orders.length === 0 ? (
        <div className="orders-empty">
          <h2>No orders yet</h2>
          <p>You haven't placed any orders yet.</p>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div className="order-card" key={order.id}>

              <div className="order-card-top">
                <h2>Order #{order.id}</h2>

                <span className="order-status">
                  {order.status}
                </span>
              </div>

              <div className="order-info">
                <p>
                  Date:{" "}
                  {new Date(
                    order.createdAt
                  ).toLocaleDateString()}
                </p>

                <p className="order-total">
                  Total: {order.total} ETB
                </p>
              </div>

              <div className="order-actions">
                <button
                  className="order-view-button"
                  onClick={() =>
                    navigate(`/orders/${order.id}`)
                  }
                >
                  View Details
                </button>

                {order.status === "pending" && (
                  <button
                    className="order-cancel-button"
                    onClick={() =>
                      cancelOrder(order.id)
                    }
                  >
                    Cancel Order
                  </button>
                )}
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  </main>
);
}

export default Orders;
