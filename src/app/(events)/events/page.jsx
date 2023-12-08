"use client"
import { Navbar } from '@/components/Navbar'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Card from '@/components/ui/Card';
import { useRouter } from 'next/router';

const EventsPage = () => {
  const router = useRouter();
  const [events, setEvents] = useState([]);

  const handleEventData = async () => {
    const response = await axios.get('/api/events')
    console.log(response);
    setEvents(response.data);
  }

  const redirToVercel = () => {
    if (window.location.href.includes('onrender.com')) {
      window.location.href = 'https://laligadelamusica42.vercel.app/events/'
    }
  }
  
  const checkIfDev = () => {
    if (process.env.NODE_ENV === 'development') {
      console.log('dev');
    } else if (process.env.NODE_ENV === 'production') {
      router.replace(`/ondev`);
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
      <main>
        {
          events.map((event, index) => {
            return (
              <div className='p-5 m-5' key={0}>
                <Card key={index} image_src={event.posterUrl} event_name={event.eventName} event_desc={event.eventDescription} event_url={`This is the url`} />
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

export default EventsPage