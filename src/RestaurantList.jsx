import React, { useEffect, useState } from 'react';
import RestaurantCard from './RestaurantCard';
import './RestaurantList.css'; // Import your CSS file

function RestaurantList() {

  const [restaurants, setRestaurants] = useState([])


  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/restaurants/ratings')
        if(!response.ok) {
          throw new Error(response.statusText)
 }
        let responseData = await response.json()
        console.log("ennen mappausta", responseData)
        
        responseData = responseData.map((restaurant) => {
          return {...restaurant, imageUrl: '/images/cheese_burger.jpg'}
        })
        
        console.log("mappauksen jalkeen", responseData)
        setRestaurants(responseData)
      } catch(e) {
          console.log(e)
      }
    }
    fetchRestaurants()
  }, [])
  
    
  return (
    <div className="restaurant-list-container">
      <div className="side-panel">
        <h3>Actions</h3>
        <button onClick={() => {}}>Add Rating</button>
        {/* Add more action buttons here */}
      </div>
      <div className="restaurant-list">
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
}

export default RestaurantList;