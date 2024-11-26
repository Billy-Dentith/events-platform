import React from 'react'
import "./Home.css"
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="home-page">
      <section className="home-top-section">
      <section className="opening-section">
          <h1>Event Nest: Where Moments Take Flight</h1>
          <p>
            Whatever your passion, thousands share it too. Events Nest is here
            to help you find your community and make meaningful connections.
          </p>
          <div className="button">
            <button>
              <Link to="/account" className="link">
                Join Event Nest
              </Link>
            </button>
          </div>
        </section>
        <img src="./src/assets/nest.png" alt="nest image" />
      </section>
      <section className="events-list">
        <div className="title">
          <h1>Local Events</h1>
        </div>
      </section>
    </div>
  )
}

export default Home