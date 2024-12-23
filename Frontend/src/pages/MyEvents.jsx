import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import EventCard from '../components/EventCard';
import { fetchUsersEvents } from '../api';
import "./Events.css"
import Loading from '../components/Loading';
import Error from '../components/Error';

const MyEvents = () => {
  const [usersEvents, setUsersEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const { currentUser } = useContext(AuthContext);  

  useEffect(() => {
    if (currentUser) {
      const uid = currentUser.uid;      

      const getUsersEvents = async () => {
        try {
          const events = await fetchUsersEvents(uid);
          setUsersEvents(events);
          setIsLoading(false);
        } catch (error) {
          console.error("Failed to fetch users events: ", error.message);
          setIsLoading(false);
          setIsError(true);
        }
      }

      getUsersEvents(); 
    } else {
      setIsLoading(false); 
    }
  }, [currentUser])

  return (
    <div className='events-page'>
      <h1>My Events</h1>
      {isLoading && (
        <Loading loadingType="calendar" />
      )}
      {isError && (
        <Error />
      )}
      {(currentUser && usersEvents.length === 0 && !isLoading && !isError) && (
        <div className='no-events'>
          <h2>You've not joined any events.</h2>
          <h2> Click the button below to view upcoming events.</h2>
          <button>
            <Link to="/events" className="link">
                Find Events
            </Link>
          </button>
        </div>
      )}
      {!currentUser && (
        <div className='no-events'>
        <h2>Please sign in to access your events or sign up to discover and join our exciting events.</h2>
        <h2> Click the button below.</h2>
        <button>
          <Link to="/account" className="link">
              Sign In / Register
          </Link>
        </button>
      </div>
      )}
      <ul className='events-list'>
        {usersEvents.map((event) => (
          <EventCard key={event._id} event={event} calendarButton={true} leaveButton={true} setUsersEvents={setUsersEvents} usersEvents={usersEvents} />
        ))}
      </ul>
    </div>
  )
}

export default MyEvents