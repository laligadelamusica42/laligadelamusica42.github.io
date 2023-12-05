'use client'
import React from 'react'
//import { axios } from 'axios';
import { Navbar } from '@/components/Navbar';

const EventsPage = () => {
  const eventId = window.location.href.split('/').pop();
  const getEventInfo = (type, id) => {
    //axios.get(`http://localhost:3000/api/events/${id}`)
  }
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <section>
          <h1>Event</h1>
          <p>Event ID: {eventId}</p>
          
        </section>
      </main>
      <footer>

      </footer>
    </>
  )
}

export default EventsPage