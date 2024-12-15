import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import { fetchEvents } from "../api";
import EventCard from "../components/EventCard";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const [featuredEvents, setFeaturedEvents] = useState([]);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const events = await fetchEvents();
        const featured = events
          .filter((event) => {
            return new Date(event.date) > new Date();
          })
          .sort((a, b) => {
            return new Date(a.date) - new Date(b.date);
          })
          .slice(0, 4);

        setFeaturedEvents(featured);
      } catch (error) {
        console.error("Failed to fetch events: ", error.message);
      }
    };

    getEvents();
  }, []);

  return (
    <div className="home-page">
      <section className="home-top-section">
        <section className="opening-section">
          <h1>Event Nest: Where Moments Take Flight</h1>
          <p>
            Whatever your passion, thousands share it too. Events Nest is here
            to help you find your community and make meaningful connections.
          </p>
          {!user && (
            <button className="button">
              <Link to="/account" className="link">
                Join Event Nest
              </Link>
            </button>
          )}
        </section>
        <img src="./src/assets/nest.png" alt="nest image" />
      </section>
      <section className="featured-events">
        <h1>Featured Events</h1>
        <ul className="events-list">
          {featuredEvents.map((event) => (
            <EventCard
              key={event._id}
              event={event}
              setEvents={setFeaturedEvents}
              events={featuredEvents}
              joinButton={true}
            />
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Home;
