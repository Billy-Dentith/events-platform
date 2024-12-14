import React, { useContext, useEffect, useState } from "react";
import { FaPencil, FaRegTrashCan } from "react-icons/fa6";
import { auth } from "../../firebase/firebase";
import { AuthContext } from "../context/AuthContext";
import "./EventCard.css";
import CalendarButton from "./GoogleCalendarButton";
import EditEvent from "./EditEvent";
import EventInfo from "./EventInfo";
import { deleteEvent, JoinEvent } from "../api";

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

  const handleJoin = async () => {
    try {
      const data = await JoinEvent(event._id, auth.currentUser.uid);
      console.log(data);
    } catch (error) {
      console.error("Failed to join event: ", error.message);
    }
  };

  const handleDelete = async (eventId) => {
    setEvents(events.filter((event) => event._id !== eventId))

    try {
      const data = await deleteEvent(eventId);
      console.log(data);
    } catch (error) {
      console.error("Failed to delete event: ", error.message);
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
