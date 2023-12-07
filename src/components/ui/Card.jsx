"use client"
import React from "react";

const Card = ({ image_src, event_name, event_desc, event_url }) => {
  const handleCardClick = (event_url) => {
    console.log(event_url);
  }
  return (
    <div className="shadow-xl card w-96 bg-base-100">
      <figure>
        <img
          src={image_src}
          alt="Event_Poster"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{event_name}</h2>
        <p>{event_desc}</p>
        <div className="justify-end mt-5 card-actions">
          <button className="btn btn-primary" onClick={() => handleCardClick(event_url)}>Saber Más...</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
