//import { useParams, useEffect } from 'react-router-dom';

import React, { useEffect, useState  } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import StarRating from './StarRating';
import './RestaurantCard.css';

function RatingsByRestaurant() {
    
  const {id} = useParams();

  const [ratings, setRatings] = useState([])

  const removeRating = async (ratingId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/restaurants/${id}/ratings/${ratingId}`, {
        method: 'DELETE'
      })
      if(!response.ok) {
        throw new Error(response.statusText)
      }
      const remainingRatings = ratings.filter((rating) => {
        return rating.id != ratingId
      })
      setRatings(remainingRatings)
    } catch(e) {
      console.log(e)
    }
  }

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/restaurants/${id}/ratings`)
        if(!response.ok) {
            throw new Error(response.statusText)
        }
        const responseData = await response.json()
        setRatings(responseData)
        console.log(responseData)
      } catch(e) {
        console.log(e)
      }
    }
    fetchRatings()
  }, [])


  return (
    <div className="restaurant-list-container">
      <div className="side-panel">
        <h3>Actions</h3>
        <button onClick={() => {}}>Add Rating</button>
      </div>
      <div className="restaurant-list">
        {ratings.map((rating) => (
        <RatingItem rating={rating} key={rating.id} id={id} removeRating={removeRating} />
        ))}
      </div>
    </div>
    );
}

  function RatingItem({rating, removeRating}) {
    return (

      <div key={rating.id} className="restaurant-card" >     
          <div className="restaurant-list-container">
            <StarRating rating={rating.value} />         

          </div>

        <div className="restaurant-list">
          {rating.description}</div>
          
        <div className="restaurant-list">
          Arvostelupvm: {rating.date_rated}</div>

        <button className="remove-rating-button-right" onClick={() => removeRating(rating.id)}>
              Delete
        </button>
      </div>
    )
  }

export default RatingsByRestaurant;