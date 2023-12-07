"use client"
import { Navbar } from '@/components/Navbar'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Card from '@/components/ui/Card';

const EventsPage = () => {
  const [events, setEvents] = useState([]);

  const handleEventData = async () => {
    const response = await axios.get('https://legendary-invention-45xwwgw4wvrfjxjv-3000.app.github.dev/api/events')
    console.log(response);
    setEvents(response.data);
  }

  const redirToVercel = () => {
    if (window.location.href.includes('onrender.com')) {
      window.location.href = 'https://laligadelamusica42.vercel.app/events/'
    }
  }
  useEffect(() => {
    redirToVercel();
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