import React from "react";
import {
  FaMapLocationDot,
  FaBuilding,
  FaTicket,
  FaPeopleGroup,
  FaClock,
  FaCalendarDays,
  FaCircleInfo,
} from "react-icons/fa6";
import "./EventCard.css";

const EventCard = ({ event }) => {
  const created_at = event.date.replace("T", " ").substring(0, 16);

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
        <button className="button">
          Join Event
        </button>
      }
    </li>
  );
};

export default EventCard;
