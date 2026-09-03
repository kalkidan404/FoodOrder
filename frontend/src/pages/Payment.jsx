
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/api";
import "../styles/Payment.css";
function Payment() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const initializePayment = async () => {
    try {
      setLoading(true);

      const response = await api.post(`/payment/${id}`);

      const checkoutUrl = response.data.checkoutUrl;

      window.location.href = checkoutUrl;
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Failed to initialize payment"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
  <main className="payment-page">
    <div className="payment-card">
      <div className="payment-icon">
        $
      </div>

      <p className="payment-label">Secure Payment</p>

      <h1>Complete Your Payment</h1>

      <p className="payment-order">
        Order #{id}
      </p>

      <p className="payment-description">
        You will be redirected to Chapa to securely complete
        your payment.
      </p>

      <div className="payment-actions">
        <button
          className="payment-pay-button"
          onClick={initializePayment}
          disabled={loading}
        >
          {loading ? "Loading..." : "Pay with Chapa"}
        </button>

        <button
          className="payment-back-button"
          onClick={() => navigate(`/orders/${id}`)}
        >
          Back to Order
        </button>
      </div>
    </div>
  </main>
);
}

export default Payment;
