import React from "react";
import { FcGoogle } from "react-icons/fc";
import "./GoogleCalendarButton.css"

const CalendarButton = ({ event }) => {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  const handleAddEvent = async () => {
    const client = google.accounts.oauth2.initTokenClient({
      client_id: clientId,
      scope: 'https://www.googleapis.com/auth/calendar.events',
      callback: async (tokenResponse) => {
        const accessToken = tokenResponse.access_token;

        const newEvent = {
          summary: event.title,
          location: event.location,
          description: event.description,
          start: {
            dateTime: event.date,
          },
          end: {
            dateTime: event.date,
          },
        };

        try {
          const response = await fetch(
            'https://www.googleapis.com/calendar/v3/calendars/primary/events',
            {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(newEvent),
            }
          );

          if (response.ok) {
            alert('Event added to Google Calendar!');
          } else {
            const errorData = await response.json();
            console.error('Error adding event:', errorData);
          }
        } catch (error) {
          console.error('Network error:', error);
        }
      },
    });

    client.requestAccessToken();
  };

  return (
    <button className="google-button" onClick={handleAddEvent}>
      <FcGoogle className="google-icon" />
      <p>Add to Google Calendar</p>
    </button>
  );
};

export default CalendarButton;
