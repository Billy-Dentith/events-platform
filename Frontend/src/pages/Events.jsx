import React, { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import { fetchEvents } from "../api";
import "./Events.css";
import Loading from "../components/Loading";
import Error from "../components/Error";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const events = await fetchEvents();
        setEvents(events);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch events: ", error.message);
        setIsLoading(false);
        setIsError(true);
      }
    }

    getEvents(); 
  }, []);

  return (
    <div className='events-page'>
      <h1>Events</h1>
      {isLoading && (
        <Loading loadingType="calendar" />
      )}
      {isError && (
        <Error />
      )}
      <ul className='events-list'>
        {events.map((event) => (         
          <EventCard key={event._id} event={event} setEvents={setEvents} events={events} joinButton={true}/>
        ))}
      </ul>
    </div>
  )
};

export default Events;
