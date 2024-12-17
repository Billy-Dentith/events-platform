import React, { useContext, useState } from "react";
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
import { editEvent } from "../api";
import { AuthContext } from "../context/AuthContext";

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

  const { role } = useContext(AuthContext);

  const validateInputs = () => {
    if (isNaN(inputs.spaces) || inputs.spaces < 0) {
      setPatchStatus("Spaces must be a valid number.");
      return false;
    }
    if (isNaN(inputs.cost) || inputs.cost < 0) {
      setPatchStatus("Cost must be a valid number.");
      return false;
    }
  
    return true; 
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setPatchStatus("");
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateInputs()) return;

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

    if (role === "staff" || role === "admin") {
      try {
        const data = await editEvent(event._id, body); 
        console.log("Event edited successfully: ", data);

        Object.assign(event, body);
        
        setPatchStatus("Event changes saved successfully");
        setIsEditingEvent(false); 
      } catch (error) {
        console.error("Failed to edit event: ", error.message);

        setPatchStatus("Unable to save changes. Please try again later.");
      } finally {
        setIsDisabled(false);
        setButtonText("Save Changes");
      }
    } else {
      alert("Unauthorised! You must be a member of staff to add events.")
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
