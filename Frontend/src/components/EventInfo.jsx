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

const EventInfo = ({ event, created_at }) => {
  return (
    <>
      <div className="event-desc">
        <FaCircleInfo id="info-icon" />
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
    </>
  );
};

export default EventInfo;
