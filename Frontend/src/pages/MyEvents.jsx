import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import EventCard from '../components/EventCard';
import { fetchUsersEvents } from '../api';
import "./Events.css"
import Loading from '../components/Loading';

const MyEvents = () => {
  const [usersEvents, setUsersEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useContext(AuthContext);  

  useEffect(() => {
    if (user) {
      const uid = user.uid;      

      const getUsersEvents = async () => {
        try {
          const events = await fetchUsersEvents(uid);
          setUsersEvents(events);
          setIsLoading(false);
        } catch (error) {
          console.error("Failed to fetch users events: ", error.message);
        }
      }

      getUsersEvents(); 
    }
  }, [user])

  return (
    <div className='events-page'>
      <h1>My Events</h1>
      {isLoading && (
        <Loading loadingType="calendar" />
      )}
      <ul className='events-list'>
        {usersEvents.map((event) => (
          <EventCard key={event._id} event={event} calendarButton={true} />
        ))}
      </ul>
    </div>
  )
}

export default MyEvents