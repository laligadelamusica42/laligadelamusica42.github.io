"use client"
import { Navbar } from "@/components/Navbar";
import React from "react";
import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from 'next/navigation'

const page = ({ params }) => {
  const router = useRouter();
  
  const redirToVercel = () => {
    if (window.location.href.includes('onrender.com')) {
      window.location.href = `https://laligadelamusica42.vercel.app/events/${params.id}`
    }
  }

  const checkIfDev = () => {
    if (process.env.NODE_ENV === 'development') {
      console.log('dev');
    } else if (process.env.NODE_ENV === 'production') {
      window.location.href = 'https://laligadelamusica42.vercel.app/ondev/'
    }
  }

  useEffect(() => {
    redirToVercel();
    checkIfDev();
  });

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <h1 className="text-4xl font-bold text-center text-white">
          <span className="text-blue-500">Master</span>
          <span className="text-yellow-400">Class</span>
        </h1>
        <h3 className="text-2xl font-bold text-center text-white">
          Producción Musical
        </h3>
        <div className="collaborators">
          <img src="/logo.png" alt="laligadelamusica42_logo" />
          <img src="/42logo.png" alt="42school_logo" />
        </div>
      </main>
    </>
  );
};

export default page;
