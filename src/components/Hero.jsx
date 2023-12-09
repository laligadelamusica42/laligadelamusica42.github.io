"use client"
import React from "react";

const Hero = () => {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage:
          "url(/images/hero_bg_ideogram.jpg)",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold text-white stroke-slate-800">Bienvenido a: <br /> <span className="pt-2 bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent text-">La Liga de la Música</span></h1>
          <p className="mb-5 text-gray-200 text-xl">
            La sinfonía del bit: El ritmo de la máquina.
          </p>
          <button className="btn btn-primary" onClick={() => window.location.href = "/events"}>Ver Eventos</button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
