import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import FoodCard from "../components/FoodCard";
import api from "../api/api";
import "../styles/RestaurantDetails.css";

function RestaurantDetails() {
  const { id } = useParams();

  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getRestaurant = async () => {
      try {
        const response = await api.get(`/restaurants/${id}`);
        setRestaurant(response.data.restaurant);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getRestaurant();
  }, [id]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!restaurant) {
    return <h1>Restaurant not found</h1>;
  }

  return (
    <main className="restaurant-details-page">

      <div className="restaurant-details-card">
        <div className="restaurant-details-image-container">
          {restaurant.image && (
            <img
              className="restaurant-details-image"
              src={restaurant.image}
              alt={restaurant.name}
            />
          )}
        </div>

        <div className="restaurant-details-content">
          <p className="restaurant-details-label">
            Restaurant
          </p>

          <h1>{restaurant.name}</h1>

          <p className="restaurant-details-description">
            {restaurant.description}
          </p>
        </div>
      </div>

      <section className="restaurant-foods-section">
        <h2>Foods from {restaurant.name}</h2>

        {restaurant.food?.length === 0 ? (
          <p className="restaurant-no-foods">
            No foods available.
          </p>
        ) : (
          <div className="restaurant-foods-grid">
            {restaurant.food?.map((food) => (
              <FoodCard
                key={food.id}
                food={food}
              />
            ))}
          </div>
        )}
      </section>

    </main>
  );
}

export default RestaurantDetails;