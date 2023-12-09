"use client"
import { Navbar } from "@/components/Navbar";
import React, { useState } from "react";
import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from 'next/navigation'
import axios from 'axios';

const page = ({ params }) => {
  const [events, setEvents] = useState([]);

  const handleEventData = async () => {
    const response = await axios.get(`/api/events/${params.id}`)
    setEvents([response.data]);
  }

  const redirToVercel = () => {
    if (window.location.href.includes('onrender.com')) {
      window.location.href = `https://laligadelamusica42.vercel.app/events/${params.id}`
    }
  };

  const checkIfDev = () => {
    if (process.env.NODE_ENV === 'development') {
      console.log('dev');
    } else if (process.env.NODE_ENV === 'production') {
      window.location.href = 'https://laligadelamusica42.vercel.app/ondev/'
    }
  };

  useEffect(() => {
    redirToVercel();
    checkIfDev();
  }, []);

  useEffect(() => {
    handleEventData();
  }, []);

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        {
          events.map((event, index) => {
            return (
              <div className='p-5 m-5' key={index}>
                <div className='flex flex-col items-center justify-center'>
                  <div className='flex flex-col items-center justify-center'>
                    <Image src={event.posterUrl} width={500} height={500} />
                    <h1 className='text-3xl font-bold'>{event.eventName}</h1>
                    <p className='text-xl'>{event.eventDescription}</p>
                    <a href={event.eventUrl} target='_blank' className='text-xl text-blue-600 hover:text-blue-800'>Event Link</a>
                  </div>
                </div>
              </div>
            )
          })
        }
      </main>
    </>
  );
};

export default page;
