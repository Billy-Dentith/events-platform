import React, { useContext, useState } from "react";
import "./CreateEvent.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addEvent } from "../api";
import Loading from "./Loading";
import { AuthContext } from "../context/AuthContext";

const CreateEvent = () => {
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    location: "",
    spaces: 0,
    category: "",
    organizer: "",
    cost: 0,
  });
  const [date, setDate] = useState(new Date());
  const [postStatus, setPostStatus] = useState("");
  const [buttonText, setButtonText] = useState("Add Event");
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false); 

  const futureDatesOnly = (date) => new Date() < date;

  const { role } = useContext(AuthContext);

  const validateInputs = () => {
    if (!inputs.description || !inputs.location || !inputs.organizer) {
      setPostStatus("All fields must be filled out.");
      return false;
    }
  
    if (isNaN(inputs.spaces) || inputs.spaces < 0) {
      setPostStatus("Spaces must be a valid number.");
      return false;
    }
    if (isNaN(inputs.cost) || inputs.cost < 0) {
      setPostStatus("Cost must be a valid number.");
      return false;
    }
  
    return true; 
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setPostStatus("");
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateInputs()) return;

    setIsLoading(true);
    setIsDisabled(true);
    setButtonText("Adding Event...");

    if (role === "staff" || role === "admin") {
      try {
        const body = {
          title: inputs.title,
          description: inputs.description,
          date: date.toISOString(),
          location: inputs.location,
          maxSpaces: inputs.spaces,
          category: inputs.category,
          organizer: inputs.organizer,
          cost: inputs.cost,
        };

        const data = await addEvent(body); 
        console.log("Event added successfully: ", data);

        setPostStatus("Event posted successfully");
        setInputs({
          title: "",
          description: "",
          location: "",
          spaces: 0,
          category: "",
          organizer: "",
          cost: 0,
        });
        
        e.target.reset();

      } catch (error) {
        console.error("Failed to create event: ", error.message);

        setPostStatus("Unable to post event. Please try again later.");
      } finally {
        setIsLoading(false);
        setIsDisabled(false);
        setButtonText("Add Event");
      }
    } else {
      alert("Unauthorised! You must be a member of staff to add events.")
    }
  };

  return (
    <div className="create-event">
      <h2>Create New Event</h2>
      <form className="event-form" onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          placeholder="Tech Conference 2024"
          onChange={handleChange}
        ></input>
        <label htmlFor="description">Description</label>
        <input
          id="description"
          name="description"
          placeholder="A two-day conference discussing the latest in tech and innovation"
          onChange={handleChange}
        ></input>
        <label htmlFor="date">Date</label>
        <DatePicker
          id="date"
          showTimeSelect
          timeIntervals={15}
          minTime={new Date(0, 0, 0, 6, 0)}
          maxTime={new Date(0, 0, 0, 23, 30)}
          selected={date}
          onChange={(date) => setDate(date)}
          filterDate={futureDatesOnly}
          dateFormat="d MMMM YYYY, h:mmaa"
        />
        <label htmlFor="location">Location</label>
        <input
          id="location"
          name="location"
          placeholder="London, England"
          onChange={handleChange}
        ></input>
        <label htmlFor="spaces">Spaces</label>
        <input
          id="spaces"
          name="spaces"
          placeholder="100"
          onChange={handleChange}
        ></input>
        <label htmlFor="category">Category</label>
        <input
          id="category"
          name="category"
          placeholder="Conference"
          onChange={handleChange}
        ></input>
        <label htmlFor="organizer">Organizer</label>
        <input
          id="organizer"
          name="organizer"
          placeholder="Techcorp Inc."
          onChange={handleChange}
        ></input>
        <label htmlFor="cost">Cost</label>
        <input
          id="cost"
          name="cost"
          placeholder="20"
          onChange={handleChange}
        ></input>
        <button
          className="add-event-button"
          disabled={isDisabled}
        >
          {buttonText}
        </button>
        {isLoading && (
            <Loading loadingType="spinner" />
        )}
        <p>{postStatus}</p>
      </form>
    </div>
  );
};

export default CreateEvent;
