
import { useEffect, useState } from "react";

import api from "../api/api";

import "../styles/AdminRestaurants.css";

function AdminRestaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);

  const [editingRestaurantId, setEditingRestaurantId] =
    useState(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    const getRestaurants = async () => {
      try {
        setLoading(true);

        const response = await api.get(
          "/admin/restaurants"
        );

        setRestaurants(response.data.restaurant);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getRestaurants();
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
    });

    setEditingRestaurantId(null);
  };

  const addRestaurant = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post(
        "/admin/restaurants",
        form
      );

      setRestaurants([
        ...restaurants,
        response.data.restaurant,
      ]);

      resetForm();
    } catch (error) {
      console.log(error);
    }
  };

  const startEdit = (restaurant) => {
    setEditingRestaurantId(restaurant.id);

    setForm({
      name: restaurant.name,
      description: restaurant.description,
    });
  };

  const updateRestaurant = async (e) => {
    e.preventDefault();

    try {
      const response = await api.put(
        `/admin/restaurants/${editingRestaurantId}`,
        form
      );

      setRestaurants(
        restaurants.map((restaurant) =>
          restaurant.id === editingRestaurantId
            ? {
                ...restaurant,
                ...form,
              }
            : restaurant
        )
      );

      alert(
        response.data.message ||
          "Restaurant updated successfully"
      );

      resetForm();
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Failed to update restaurant"
      );
    }
  };

  const deleteRestaurant = async (id) => {
    try {
      await api.delete(
        `/admin/restaurants/${id}`
      );

      setRestaurants(
        restaurants.filter(
          (restaurant) => restaurant.id !== id
        )
      );

      if (editingRestaurantId === id) {
        resetForm();
      }
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Failed to delete restaurant"
      );
    }
  };

  return (
    <main className="admin-restaurants-page">
      <div className="admin-restaurants-container">

        <div className="admin-page-header">
          <p>RESTAURANT MANAGEMENT</p>

          <h1>Restaurants</h1>

          <span>
            Add and manage restaurants on FoodOrder.
          </span>
        </div>

        <section className="admin-form-card">

          <h2>
            {editingRestaurantId
              ? "Edit Restaurant"
              : "Add Restaurant"}
          </h2>

          <form
            className="admin-restaurant-form"
            onSubmit={
              editingRestaurantId
                ? updateRestaurant
                : addRestaurant
            }
          >
            <input
              name="name"
              placeholder="Restaurant name"
              value={form.name}
              onChange={handleChange}
            />

            <input
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
            />

            <button type="submit">
              {editingRestaurantId
                ? "Update Restaurant"
                : "Add Restaurant"}
            </button>

            {editingRestaurantId && (
              <button
                type="button"
                onClick={resetForm}
              >
                Cancel Edit
              </button>
            )}
          </form>
        </section>

        <section>
          <div className="admin-section-heading">

            <h2>All Restaurants</h2>

            <span>
              {restaurants.length} restaurants
            </span>

          </div>

          {loading && (
            <p className="admin-loading">
              Loading...
            </p>
          )}

          <div className="admin-restaurants-grid">

            {restaurants.map((restaurant) => (
              <div
                className="admin-restaurant-card"
                key={restaurant.id}
              >
                <div>
                  <h3>{restaurant.name}</h3>

                  <p>
                    {restaurant.description}
                  </p>
                </div>

                <div>
                  <button
                    className="admin-edit-button"
                    onClick={() =>
                      startEdit(restaurant)
                    }
                  >
                    Edit
                  </button>

                  <button
                    className="admin-delete-button"
                    onClick={() =>
                      deleteRestaurant(restaurant.id)
                    }
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

export default AdminRestaurants;
