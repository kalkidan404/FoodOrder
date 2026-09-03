import { Link } from "react-router-dom";
import { useContext } from "react";
import api from "../api/api";
import { AuthContext } from "../context/authContext";
import "../styles/FoodCard.css";

function FoodCard({ food }) {
  const { user } = useContext(AuthContext);

  const handleAddToCart = async () => {
    if (!user) {
      alert("Please login to add items to your cart.");
      return;
    }

    try {
      await api.post("/cart", {
        foodId: food.id,
        quantity: 1
      });

      alert("Food added to cart!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="food-card">
      <img
        className="food-card-image"
        src={food.Image}
        alt={food.name}
      />

      <div className="food-card-content">
        <h2 className="food-card-name">
          {food.name}
        </h2>

        <p className="food-card-description">
          {food.description}
        </p>

        <p className="food-card-price">
          {food.price} ETB
        </p>

        <div className="food-card-actions">
          <button
            className="food-card-cart"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>

          <Link
            className="food-card-details"
            to={`/foods/${food.id}`}
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FoodCard;