"use client"
import React from "react";

const Card = ({ image_src, event_name, event_desc, event_url }) => {
  const handleCardClick = (event_url) => {
    window.location.href = event_url;
  }
  return (
    <div className="flex justify-center shadow-xl card w-96 bg-base-100 sm:justify-center sm:flex md:justify-center md:flex">
      <figure>
        <img
          src={image_src}
          alt="Event_Poster"
        />
      </figure>
      <div className="bg-gray-700 shadow-2xl rounded-b-2xl card-body shadow-gray-800">
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
