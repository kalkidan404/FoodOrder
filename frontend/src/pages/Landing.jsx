import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";
import Navbar from "../components/Navbar";
import FoodCard from "../components/FoodCard";
import "../styles/Landing.css";

function Landing() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getFoods = async () => {
      try {
        const response = await api.get("/foods");
        setFoods(response.data.foods);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getFoods();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="landing">
      <Navbar />

      <section className="landing-hero">
        <div className="landing-hero-content">
          <h1>
            Order Your <span>Favorite Food</span>
          </h1>

          <p>
            Discover delicious food from your favorite restaurants.
          </p>

          <Link to="/foods" className="landing-browse-button">
            Browse Foods
          </Link>
        </div>
      </section>

      <section className="landing-popular">
        <h2>Popular Foods</h2>

        <div className="landing-foods">
          {foods.slice(0, 6).map((food) => (
            <FoodCard key={food.id} food={food} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Landing;