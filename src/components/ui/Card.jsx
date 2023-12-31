"use client"
import React from "react";

const Card = ({ image_src, event_name, event_desc, event_url }) => {
  const uId = localStorage.getItem('uId');
  const handleCardClick = (event_url) => {
    window.location.href = event_url;
  }

  return (
    <div className="flex justify-center shadow-xl card w-96 bg-base-100 sm:justify-center sm:flex md:justify-center md:flex">
      <figure>
        <img
          src={image_src}
          alt="Event_Poster"
          priority="true"
        />
      </figure>
      <div className="bg-gray-700 shadow-2xl rounded-b-2xl card-body shadow-gray-800">
        <h2 className="card-title">{event_name}</h2>
        <p>{event_desc}</p>
        <div className="justify-end mt-5 card-actions">
          <button className={`btn ${!uId || uId === "" ? `btn-primary` : `btn-warning hover:cursor-not-allowed`}`} onClick={!uId || uId === "" ? () => handleCardClick(event_url) : null}>{!uId || uId === "" ? `Registrarme` : `Registrado`}</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
