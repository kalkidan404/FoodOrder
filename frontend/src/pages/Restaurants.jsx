import {useState, useEffect} from "react";
import api from "../api/api";
import { Link } from "react-router-dom";
import "../styles/restaurants.css";
function Restaurants(){
    const [restaurants, setRestaurants]=useState([]);
    const [Loading, setLoading]=useState(true);
    useEffect(()=>{
        const getRestaurants=async ()=>{
            try{
                const response=await api.get("/restaurants");
                setRestaurants(response.data.restaurants);
            }catch(error){
                console.log(error);
            }finally{
                setLoading(false);
            }
        }
        getRestaurants();
    },[]);
    if(Loading){
        return <h1>Loading...</h1>;
    }
    return (
  <main className="restaurants-page">

    <div className="restaurants-header">
      <h1>Restaurants</h1>
      <p>
        Discover restaurants and find your next favorite meal.
      </p>
    </div>

    <div className="restaurants-grid">
      {restaurants.map((restaurant) => (
        <div
          className="restaurant-card"
          key={restaurant.id}
        >
          <h2>{restaurant.name}</h2>

          <p>{restaurant.description}</p>

          <Link
            className="restaurant-details-button"
            to={`/restaurants/${restaurant.id}`}
          >
            View Details
          </Link>
        </div>
      ))}
    </div>

  </main>
);
}
export default Restaurants;