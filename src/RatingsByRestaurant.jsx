//import { useParams, useEffect } from 'react-router-dom';

import React, { useEffect, useState  } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import StarRating from './StarRating';

function RatingsByRestaurant() {
    
    const {id} = useParams();

  const [ratings, setRatings] = useState([])

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
        <RatingItem rating={rating} key={rating.id} resId={id} />
        ))}
      </div>
    </div>
    );
}

  function RatingItem({rating}) {
    return (

      <div key={rating.id} className="restaurant-card" >     
        <div className="restaurant-rating">
            <StarRating rating={rating.value} /></div>
        <div className="restaurant-rating">
          {rating.description}</div>
          
        <div className="restaurant-rating">
          {rating.date_rated}</div>
        <button className="remove-rating-button-right" 
        //onClick={() => ()}
        >
          Delete
        </button>
      </div>
    )
  }

export default RatingsByRestaurant;