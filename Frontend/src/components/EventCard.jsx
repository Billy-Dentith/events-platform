import React, { useContext, useEffect, useState } from "react";
import {
  FaMapLocationDot,
  FaBuilding,
  FaTicket,
  FaPeopleGroup,
  FaClock,
  FaCalendarDays,
  FaCircleInfo,
} from "react-icons/fa6";
import { auth } from "../../firebase/firebase";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import "./EventCard.css";

const EventCard = ({ event }) => {
  const [isAttending, setIsAttending] = useState(false); 

  const created_at = event.date.replace("T", " ").substring(0, 16);

  const { user } = useContext(AuthContext);   

  useEffect(() => {
    if (user) {
      if (event.attendees.some((el) => el._id === user.uid)) {
        setIsAttending(true); 
      }
    }
  }, [user, event.attendees])

  const handleJoin = () => {
    const body = {
      uid: auth.currentUser.uid
    }

    axios.patch(`http://localhost:5500/api/events/${event._id}`, body)
    .then((response) => console.log(response.data))
    .catch((error) => console.error(error));
  }

  return (
    <li key={event._id} className="event-card">
      <h3>{event.title}</h3>
      <div className="event-desc">
        <FaCircleInfo id="info" />
        <p>{event.description}</p>
      </div>
      <div className="event-info">
        <p>
          <FaClock /> {created_at.split(" ")[1]}
        </p>
        <p>
          <FaCalendarDays />{" "}
          {created_at.split(" ")[0].split("-").reverse().join("-")}
        </p>
        <p>
          <FaMapLocationDot /> {event.location}
        </p>
        <p>
          <FaBuilding /> {event.organizer}
        </p>
        <p>
          <FaTicket /> £{event.cost}
        </p>
        <p>
          <FaPeopleGroup /> {event.attendees.length} Attendees
        </p>
      </div>
      {
        <button className="button" onClick={handleJoin} disabled={isAttending}>
          {isAttending ? "Attending Event" : "Join Event"}
        </button>
      }
    </li>
  );
};

export default EventCard;
