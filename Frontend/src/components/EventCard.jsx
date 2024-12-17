import React, { useContext, useEffect, useState } from "react";
import { FaPencil, FaRegTrashCan } from "react-icons/fa6";
import { auth } from "../../firebase/firebase";
import { AuthContext } from "../context/AuthContext";
import "./EventCard.css";
import CalendarButton from "./GoogleCalendarButton";
import EditEvent from "./EditEvent";
import EventInfo from "./EventInfo";
import { deleteEvent, JoinEvent, leaveEvent } from "../api";

const EventCard = ({ setEvents, events, setUsersEvents, usersEvents, event, joinButton, calendarButton, leaveButton }) => {
  const [buttonText, setButtonText] = useState("Join Event");
  const [leaveButtonText, setLeaveButtonText] = useState("Leave Event");
  const [isEditingEvent, setIsEditingEvent] = useState(false);
  const [eventTitle, setEventTitle] = useState(event.title);
  const [attendeesNumber, setAttendeesNumber] = useState(event.attendees.length);

  const created_at = event.date.replace("T", " ").substring(0, 16);

  const { user, role } = useContext(AuthContext);

  useEffect(() => {
    if (event.attendees.length === event.maxSpaces) {
      setButtonText("Event Full");
    }

    if (user) {
      if (event.attendees.some((el) => el._id === user.uid)) {
        setButtonText("Attending Event");
      }
    }
  }, [user, event.attendees]);

  const handleJoin = async () => {
    if (!user) alert("You must be signed in to join events. Please sign in. ")
    if (attendeesNumber < event.maxSpaces) {
      try {
        const data = await JoinEvent(event._id, auth.currentUser.uid);
        console.log(data);

        setAttendeesNumber((currAttendees) => currAttendees + 1);
        setButtonText("Attending Event");
      } catch (error) {
        console.error("Failed to join event: ", error.message);
      }
    } else {
      console.error("Event is full");
    }
  };

  const handleLeave = async (eventId) => {
    setLeaveButtonText("Leaving Event..."); 
    
    try {
      const data = await leaveEvent(event._id, auth.currentUser.uid);
      console.log(data);

      setAttendeesNumber((currAttendees) => currAttendees - 1);
      setUsersEvents(usersEvents.filter((event) => event._id !== eventId));
    } catch (error) {
      console.error("Failed to leave event: ", error.message);
    } finally {
      setLeaveButtonText("Leave Event")
    }
  }

  const handleDelete = async (eventId) => {
    try {
      const data = await deleteEvent(eventId);
      console.log(data);
      setEvents(events.filter((event) => event._id !== eventId))
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
      {!isEditingEvent && <EventInfo event={event} created_at={created_at} attendeesNumber={attendeesNumber} />}
      {isEditingEvent && <EditEvent event={event} created_at={created_at} eventTitle={eventTitle} setIsEditingEvent={setIsEditingEvent} />}
      {joinButton && !isEditingEvent && (
        <button
          className="join-button"
          onClick={handleJoin}
          disabled={buttonText === "Attending Event" || buttonText === "Event Full"}
        >
          {buttonText}
        </button>
      )}
      {calendarButton && !isEditingEvent && <CalendarButton event={event} />}
      {leaveButton && !isEditingEvent && (
        <button
          onClick={() => handleLeave(event._id)}
          className="join-button"
          disabled={leaveButtonText === "Leaving Event..."}
      >
        {leaveButtonText}
      </button>
      )}
    </li>
  );
};

export default EventCard;
