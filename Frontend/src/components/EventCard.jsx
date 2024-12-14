import React, { useContext, useEffect, useState } from "react";
import { FaPencil, FaRegTrashCan } from "react-icons/fa6";
import { auth } from "../../firebase/firebase";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import "./EventCard.css";
import CalendarButton from "./GoogleCalendarButton";
import EditEvent from "./EditEvent";
import EventInfo from "./EventInfo";

const EventCard = ({ setEvents, events, event, joinButton, calendarButton }) => {
  const [isAttending, setIsAttending] = useState(false);
  const [isEditingEvent, setIsEditingEvent] = useState(false);
  const [eventTitle, setEventTitle] = useState(event.title)

  const created_at = event.date.replace("T", " ").substring(0, 16);

  const { user, role } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      if (event.attendees.some((el) => el._id === user.uid)) {
        setIsAttending(true);
      }
    }
  }, [user, event.attendees]);

  const handleJoin = () => {
    const body = {
      uid: auth.currentUser.uid,
    };

    axios
      .patch(`http://localhost:5500/api/events/${event._id}`, body)
      .then((response) => console.log(response.data))
      .catch((error) => console.error(error));
  };

  const handleDelete = (eventId) => {
    setEvents(events.filter((event) => event._id !== eventId))

    try {
      axios
        .delete(`http://localhost:5500/api/events/${event._id}`)
        .then((response) => console.log(response.data))
        .catch((error) => console.error(error));
    } catch (error) {
      console.error("Failed to delete event", error);
      alert("Failed to delete event. Please try again later");
    }
  };

  return (
    <li key={event._id} className="event-card">
      <div className="event-header">
        {!isEditingEvent && (
          <h3>{event.title}</h3>
        )}
        {isEditingEvent && (
            <input id="title" name="title" placeholder={event.title} onChange={(e) => setEventTitle(e.target.value)}></input>
        )}
        {role === "staff" && (
          <div className="edit-delete">
            <button
              className="button"
              onClick={() => setIsEditingEvent(!isEditingEvent)}
            >
              <FaPencil id="icon" />
            </button>
            <button className="button" onClick={() => handleDelete(event._id)}>
              <FaRegTrashCan id="icon" />
            </button>
          </div>
        )}
      </div>
      {!isEditingEvent && <EventInfo event={event} created_at={created_at} />}
      {isEditingEvent && <EditEvent event={event} created_at={created_at} eventTitle={eventTitle} setIsEditingEvent={setIsEditingEvent} />}
      {joinButton && !isEditingEvent && (
        <button
          className="join-button"
          onClick={handleJoin}
          disabled={isAttending}
        >
          {isAttending ? "Attending Event" : "Join Event"}
        </button>
      )}
      {calendarButton && !isEditingEvent && <CalendarButton event={event} />}
    </li>
  );
};

export default EventCard;
