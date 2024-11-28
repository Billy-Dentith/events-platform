import React, { useEffect, useState } from "react";
import axios from "axios";
import EventCard from "../components/EventCard";
import "./Events.css";

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5500/api/events")
      .then((response) => setEvents(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className='events-page'>
      <h1>Events</h1>
      <ul className='events-list'>
        {events.map((event) => (         
          <EventCard key={event._id} event={event} joinButton={true}/>
        ))}
      </ul>
    </div>
  )
};

export default Events;
