
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../api/api";
import "../styles/FoodDetails.css";
function FoodDetails() {
  const { id } = useParams();

  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getFood = async () => {
      try {
        const response = await api.get(`/foods/${id}`);

        setFood(response.data.food);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getFood();
  }, [id]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!food) {
    return <h1>Food not found</h1>;
  }

  return (
  <main className="food-details-page">
    <div className="food-details-card">

      <img
        className="food-details-image"
        src={food.Image}
        alt={food.name}
      />

      <div className="food-details-content">
        <h1>{food.name}</h1>

        <p className="food-details-description">
          {food.description}
        </p>

        <p className="food-details-price">
          {food.price} ETB
        </p>

        <p className="food-details-restaurant">
          Restaurant: <span>{food.restaurant.name}</span>
        </p>
      </div>

    </div>
  </main>
);
}

export default FoodDetails;

