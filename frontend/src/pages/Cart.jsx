
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { AuthContext } from "../context/authContext";
import "../styles/cart.css";
function Cart() {
  const { user } = useContext(AuthContext);

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const getCart = async () => {
      try {
        const response = await api.get("/cart");
        setCartItems(response.data.cart);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      getCart();
    }
  }, [user]);

  const removeItem = async (cartId) => {
    try {
      await api.delete(`/cart/${cartId}`);

      setCartItems((currentItems) =>
        currentItems.filter((item) => item.id !== cartId)
      );
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message || "Failed to remove item"
      );
    }
  };

  const placeOrder = async () => {
    try {
      const response = await api.post("/orders");

      alert("Order placed successfully!");

      navigate(`/orders/${response.data.order.id}`);
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message || "Failed to place order"
      );
    }
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!user) {
    return <h1>Please login to view your cart.</h1>;
  }

  return (
  <main className="cart-page">
    <div className="cart-container">

      <div className="cart-header">
        <h1>Your Cart</h1>
        <p>Review your items before placing your order.</p>
      </div>

      {cartItems.length === 0 ? (
        <div className="cart-empty">
          <h1>Your cart is empty</h1>
          <p>
            Add some delicious food to your cart to get started.
          </p>
        </div>
      ) : (
        <div className="cart-content">

          <div className="cart-items">
            {cartItems.map((item) => (
              <div className="cart-item" key={item.id}>

                <img
                  className="cart-item-image"
                  src={item.food.Image}
                  alt={item.food.name}
                />

                <div className="cart-item-info">
                  <h2>{item.food.name}</h2>

                  <p className="cart-item-description">
                    {item.food.description}
                  </p>

                  <p className="cart-item-price">
                    {item.food.price} ETB
                  </p>

                  <p className="cart-item-quantity">
                    Quantity: {item.quantity}
                  </p>

                  <button
                    className="cart-remove-button"
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </button>
                </div>

              </div>
            ))}
          </div>

          <aside className="cart-summary">
            <h2>Order Summary</h2>

            <div className="cart-summary-row">
              <span>Items</span>
              <span>{cartItems.length}</span>
            </div>

            <div className="cart-summary-total">
              <span>Total</span>
              <span>
                {cartItems.reduce(
                  (total, item) =>
                    total + Number(item.food.price) * item.quantity,
                  0
                )}{" "}
                ETB
              </span>
            </div>

            <button
              className="cart-order-button"
              onClick={placeOrder}
            >
              Place Order
            </button>
          </aside>

        </div>
      )}

    </div>
  </main>
);
}

export default Cart;
