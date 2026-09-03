
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/api";
import "../styles/OrderDetails.css";
function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getOrder = async () => {
      try {
        const response = await api.get(`/orders/${id}`);

        setOrder(response.data.order);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getOrder();
  }, [id]);

  const cancelOrder = async () => {
    try {
      const response = await api.delete(`/orders/${id}`);

      setOrder(response.data.order);
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

  if (!order) {
    return <h1>Order not found</h1>;
  }

  const items = JSON.parse(order.items);

  return (
  <main className="order-details-page">
    <div className="order-details-container">

      <button
        className="order-back-button"
        onClick={() => navigate("/orders")}
      >
        ← Back to Orders
      </button>

      <div className="order-details-header">
        <div>
          <p className="order-details-label">Order Details</p>
          <h1>Order #{order.id}</h1>
          <p className="order-details-date">
            Date: {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>

        <span className="order-details-status">
          {order.status}
        </span>
      </div>

      <section className="order-items-section">
        <h2>Items</h2>

        <div className="order-items">
          {items.map((item) => (
            <div className="order-item" key={item.foodId}>
              <div className="order-item-info">
                <h3>{item.name}</h3>
                <p>Price: {item.price} ETB</p>
                <p>Quantity: {item.quantity}</p>
              </div>

              <div className="order-item-subtotal">
                <span>Subtotal</span>
                <strong>
                  {item.price * item.quantity} ETB
                </strong>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="order-details-bottom">
        <div className="order-total">
          <span>Total</span>
          <strong>{order.total} ETB</strong>
        </div>

        {order.status === "pending" && (
          <div className="order-details-actions">
            <button
              className="order-cancel-button"
              onClick={cancelOrder}
            >
              Cancel Order
            </button>

            <button
              className="order-pay-button"
              onClick={() => navigate(`/payment/${order.id}`)}
            >
              Pay
            </button>
          </div>
        )}
      </div>

    </div>
  </main>
);
}

export default OrderDetails;
