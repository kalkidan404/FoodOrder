import "../styles/PaymentSuccess.css";

function PaymentSuccess() {
  return (
    <div className="payment-success-overlay">
      <div className="payment-success-card">
        <div className="payment-success-icon">
          ✓
        </div>

        <h1>Payment Successful 🎉</h1>

        <p>
          Your payment has been completed successfully.
        </p>

        <button
          className="payment-success-button"
          onClick={() => window.location.href = "/orders"}
        >
          View My Orders
        </button>
      </div>
    </div>
  );
}

export default PaymentSuccess;