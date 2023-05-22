import React, { useContext, useEffect } from "react";
import RestaurantFinder from "../apis/RestaurantFinder";
import { RestaurantsContext } from "../context/RestaurantsContext";
import { useNavigate } from "react-router-dom";
import StarRating from "./StarRating";

const RestaurantList = ({restaurants}) => {
  const {setRestaurants } = useContext(RestaurantsContext);
  let navigate = useNavigate()

//   useEffect(() => {
//     const fetchData = async () => {
//         try {
//           const response = await RestaurantFinder.get("/api/v1/restaurants/");
//           console.log(response.data.data);
//           setRestaurants(response.data.data.restaurants);
//         } catch (err) {}
//       };
//     fetchData();
//   }, []);

  const handleDelete = async (e, id) => {
    e.stopPropagation()
    try {
      const response = await RestaurantFinder.delete(`/api/v1/restaurants/${id}`);
      console.log(response.data.data);
      setRestaurants(restaurants.filter(restaurant =>{
        return restaurant.restaurant_id !== id
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async (e, id) => {
    e.stopPropagation()
    navigate(`/restaurants/${id}/update`)
  };

  const handleRestaurantSelect = async (id) => {
    navigate(`/restaurants/${id}`)
  };

  const renderRating = (restaurant) => {
    if (!restaurant.count) {
      return <span className="text-warning">0 reviews</span>;
    }
    return (
      <>
        <StarRating rating={restaurant.average_rating} />
        <span className="text-warning ml-1">({restaurant.count})</span>
      </>
    );
  };

  return (
    <div className="list-group">
      <table className="table table-hover table-dark">
        <thead>
          <tr className="bg-primary">
            <th scope="col">Restaurant</th>
            <th scope="col">Location</th>
            <th scope="col">Price Range</th>
            <th scope="col">Ratings</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {/* restaurants && check if restaurants exist, then run code */}
          {restaurants &&
            restaurants.map((restaurant) => {
              return (
                <tr onClick={()=>handleRestaurantSelect(restaurant.restaurant_id)} key={restaurant.restaurant_id }> 
                  <td>{restaurant.name}</td>
                  <td>{restaurant.location}</td>
                  <td>{"$".repeat(restaurant.price_range)}</td>
                  <td>{renderRating(restaurant)}</td>
                  <td>
                    <button 
                    onClick={(e) =>handleUpdate(e, restaurant.restaurant_id)}
                    className="btn btn-warning">
                      Update
                    </button>
                  </td>
                  <td>
                    <button 
                    onClick={(e) =>handleDelete(e, restaurant.restaurant_id)}
                    className="btn btn-danger">
                      Delete
                    </button>
                  </td>
                </tr>

              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default RestaurantList;
