
import { useEffect, useState } from "react";

import api from "../api/api";

import "../styles/AdminFoods.css";

function AdminFoods() {
  const [foods, setFoods] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);

  const [editingFoodId, setEditingFoodId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    Image: "",
    price: "",
    restaurantId: "",
  });

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);

        const foodResponse = await api.get("/admin/foods");
        const restaurantResponse = await api.get("/admin/restaurants");

        setFoods(foodResponse.data.foods);
        setRestaurants(restaurantResponse.data.restaurant);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setForm({
      name: "",
      description: "",
      Image: "",
      price: "",
      restaurantId: "",
    });

    setEditingFoodId(null);
  };

  const addFood = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/admin/foods", form);

      setFoods([...foods, response.data.food]);

      resetForm();
    } catch (error) {
      console.log(error);
    }
  };

  const startEdit = (food) => {
    setEditingFoodId(food.id);

    setForm({
      name: food.name,
      description: food.description,
      Image: food.Image,
      price: food.price,
      restaurantId: food.restaurantId,
    });
  };

  const updateFood = async (e) => {
    e.preventDefault();

    try {
      const response = await api.put(
        `/admin/foods/${editingFoodId}`,
        form
      );
console.log("UPDATED FOOD:", response.data.food);
      setFoods(
        foods.map((food) =>
          food.id === editingFoodId
            ? {
                ...food,
                ...form,
                price: Number(form.price),
                restaurantId: Number(form.restaurantId),
              }
            : food
        )
      );

      alert(response.data.message || "Food updated successfully");

      resetForm();
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Failed to update food"
      );
    }
  };

  const deleteFood = async (id) => {
    try {
      await api.delete(`/admin/foods/${id}`);

      setFoods(
        foods.filter((food) => food.id !== id)
      );

      if (editingFoodId === id) {
        resetForm();
      }
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Failed to delete food"
      );
    }
  };

  return (
    <main className="admin-foods-page">
      <div className="admin-foods-container">

        <div className="admin-page-header">
          <p>FOOD MANAGEMENT</p>

          <h1>Foods</h1>

          <span>
            Add and manage the foods available on FoodOrder.
          </span>
        </div>

        <section className="admin-form-card">

          <h2>
            {editingFoodId ? "Edit Food" : "Add Food"}
          </h2>

          <form
            className="admin-food-form"
            onSubmit={editingFoodId ? updateFood : addFood}
          >
            <input
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
            />

            <input
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
            />

            <input
              name="Image"
              placeholder="Image URL"
              value={form.Image}
              onChange={handleChange}
            />

            <input
              name="price"
              type="number"
              placeholder="Price"
              value={form.price}
              onChange={handleChange}
            />

            <select
              name="restaurantId"
              value={form.restaurantId}
              onChange={handleChange}
            >
              <option value="">
                Select restaurant
              </option>

              {restaurants.map((restaurant) => (
                <option
                  key={restaurant.id}
                  value={restaurant.id}
                >
                  {restaurant.name}
                </option>
              ))}
            </select>

            <button type="submit">
              {editingFoodId ? "Update Food" : "Add Food"}
            </button>

            {editingFoodId && (
              <button
                type="button"
                onClick={resetForm}
              >
                Cancel Edit
              </button>
            )}
          </form>
        </section>

        <section className="admin-foods-list-section">

          <div className="admin-section-heading">
            <h2>All Foods</h2>

            <span>
              {foods.length} foods
            </span>
          </div>

          {loading && (
            <p className="admin-loading">
              Loading...
            </p>
          )}

          <div className="admin-foods-grid">

            {foods.map((food) => (
              <div
                className="admin-food-card"
                key={food.id}
              >
                <div className="admin-food-card-content">

                  <h3>{food.name}</h3>

                  <p>{food.description}</p>

                  <strong>
                    {food.price} ETB
                  </strong>

                </div>

                <div>
                  <button
                    className="admin-edit-button"
                    onClick={() => startEdit(food)}
                  >
                    Edit
                  </button>

                  <button
                    className="admin-delete-button"
                    onClick={() => deleteFood(food.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}

          </div>
        </section>

      </div>
    </main>
  );
}

export default AdminFoods;

