import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import EventCard from '../components/EventCard';
import "./Events.css"

const MyEvents = () => {
  const [myEvents, setMyEvents] = useState([]);

  const { user } = useContext(AuthContext);  

  useEffect(() => {
    if (user) {
      const uid = user.uid;      

      axios
        .get(`http://localhost:5500/api/users/${uid}`)
        .then((response) => setMyEvents(response.data))
        .catch((error) => console.error(error));
    }
  }, [user])

  return (
    <div className='events-page'>
      <h1>My Events</h1>
      <ul className='events-list'>
        {myEvents.map((event) => (
          <EventCard key={event._id} event={event} calendarButton={true} />
        ))}
      </ul>
    </div>
  )
}

export default MyEvents