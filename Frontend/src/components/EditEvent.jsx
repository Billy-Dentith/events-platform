import React, { useState } from "react";
import {
  FaMapLocationDot,
  FaBuilding,
  FaTicket,
  FaPeopleGroup,
  FaClock,
  FaCircleInfo,
} from "react-icons/fa6";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./EditEvent.css";
import axios from "axios";

const EditEvent = ({ event, eventTitle, setIsEditingEvent }) => {
  const [inputs, setInputs] = useState({
    description: event.description,
    location: event.location,
    spaces: event.maxSpaces,
    category: event.category,
    organizer: event.organizer,
    cost: event.cost,
  });
  const [date, setDate] = useState(new Date(event.date));
  const [patchStatus, setPatchStatus] = useState("");
  const [buttonText, setButtonText] = useState("Save Changes");
  const [isDisabled, setIsDisabled] = useState(false);

  const futureDatesOnly = (date) => new Date() < date;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setPatchStatus("");
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsDisabled(true);
    setButtonText("Saving Changes...");

    const body = {
      title: eventTitle,
      description: inputs.description,
      date: date.toISOString(),
      location: inputs.location,
      maxSpaces: inputs.spaces,
      category: inputs.category,
      organizer: inputs.organizer,
      cost: inputs.cost,
    };

    try {
      axios
        .patch(`http://localhost:5500/api/events/${event._id}/edit`, body)
        .then((response) => {
          console.log(response.data);

          setPatchStatus("Event changes saved successfully");
          
          Object.assign(event, body);
          
          setIsDisabled(false);
          setButtonText("Save Changes");
          setIsEditingEvent(false); 
        })
        .catch((error) => {
          console.error(error);
          
          setPatchStatus("Unable to save changes. Please try again later.");
          setIsDisabled(false);
          setButtonText("Save Changes");
        });
    } catch (error) {
      console.error(error.message);
    } 
  };

  return (
    <div className="create-event">
      <form className="edit-event-form" onSubmit={handleSubmit}>
        <div className="event-desc">
          <div className="input-div">
            <FaCircleInfo id="info-icon" />
            <textarea
              id="description"
              name="description"
              placeholder={event.description}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="input-div">
            <FaClock />
            <DatePicker
              id="date"
              className="date-picker"
              showTimeSelect
              timeIntervals={15}
              minTime={new Date(0, 0, 0, 6, 0)}
              maxTime={new Date(0, 0, 0, 23, 30)}
              selected={date}
              onChange={(date) => setDate(date)}
              filterDate={futureDatesOnly}
              dateFormat="d MMMM YYYY, h:mmaa"
            />
          </div>
        </div>
        <div className="event-info">
          <div className="input-div">
            <FaMapLocationDot />
            <input
              id="location"
              name="location"
              placeholder={event.location}
              onChange={handleChange}
            ></input>
          </div>
          <div className="input-div">
            <FaBuilding />
            <input
              id="organizer"
              name="organizer"
              placeholder={event.organizer}
              onChange={handleChange}
            ></input>
          </div>
          <div className="input-div">
            <FaTicket />
            <input
              id="cost"
              name="cost"
              placeholder={event.cost}
              onChange={handleChange}
            ></input>
          </div>
          <div>
            <FaPeopleGroup /> {event.attendees.length} Attendees
          </div>
        </div>
        <p>{patchStatus}</p>
        <button className="save-button" disabled={isDisabled}>
          {buttonText}
        </button>
      </form>
    </div>
  );
};

export default EditEvent;
