import React, { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import { fetchEvents } from "../api";
import "./Events.css";

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const events = await fetchEvents();
        setEvents(events);
      } catch (error) {
        console.error("Failed to fetch events: ", error.message);
      }
    }

    getEvents(); 
  }, []);

  return (
    <div className='events-page'>
      <h1>Events</h1>
      <ul className='events-list'>
        {events.map((event) => (         
          <EventCard key={event._id} event={event} setEvents={setEvents} events={events} joinButton={true}/>
        ))}
      </ul>
    </div>
  )
};

export default Events;
