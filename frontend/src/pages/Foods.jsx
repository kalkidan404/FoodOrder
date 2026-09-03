import {useState, useEffect} from "react";
import api from "../api/api";
import FoodCard from "../components/FoodCard";
function Foods(){
    const [foods,setFoods]=useState([]);
    const [Loading,setLoading]=useState(true);
    useEffect(()=>{
const getFoods=async ()=>{
    try{
        const respons=await api.get("/foods");
        setFoods(respons.data.foods);
        
    }catch(error){
        console.log(error);
    }finally{
        setLoading(false);
    }
};
getFoods();
},[]);
if(Loading){
    return <h1>Loading...</h1>;
}
return (
  <div className="foods-page">
    <div className="foods-header">
      <h1>All Foods</h1>
      <p>
        Explore delicious meals from your favorite restaurants.
      </p>
    </div>

    <div className="foods-grid">
      {foods.map((food) => (
        <FoodCard
          key={food.id}
          food={food}
        />
      ))}
    </div>
  </div>
);
}
export default Foods;