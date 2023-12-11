"use client"
import { Navbar } from '@/components/Navbar'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Card from '@/components/ui/Card';

const Events = () => {
  const [events, setEvents] = useState([]);

  const handleEventData = async () => {
    const response = await axios.get('/api/events');
    setEvents(response.data);
  };

  const redirToVercel = () => {
    if (window.location.href.includes('onrender.com')) {
      window.location.href = 'https://laligadelamusica42.vercel.app/events/';
    }
  };

  const checkIfDev = () => {
    if (process.env.NODE_ENV === 'development') {
      console.log('dev');
    } else if (process.env.NODE_ENV === 'production') {
      window.location.href = 'https://laligadelamusica42.vercel.app/ondev/';
    }
  }

  useEffect(() => {
    redirToVercel();
    checkIfDev();
  });

  // Call handleEventData when the component mounts
  useEffect(() => {
    handleEventData();
  }, []);

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className='py-5 mx-auto lg:max-w-8xl'>
        {
          events.map((event, index) => {
            return (
              <div className='flex justify-center w-full h-full mt-10 lg:grid lg:grid-col-2 md:flex md:justify-center md:mt-10 sm:flex sm:justify-center '>
                <Card key={index} image_src={event.posterUrl} event_name={event.eventName} event_desc={event.eventDescription} event_url={`/events/register/${event.id}?step=1`} />
              </div>
            )
          })
        }
      </main>
      <footer>

      </footer>
    </>
  )
}

export default Events;
