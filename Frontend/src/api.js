import axios from "axios";

const eventsApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const fetchEvents = async () => {
  const response = await eventsApi.get("/events");
  return response.data;
};

export const fetchUsersEvents = async (uid) => {
  const response = await eventsApi.get(`/users/${uid}`);
  return response.data;
};

export const JoinEvent = async (eventId, uid) => {
  const body = { uid };

  const response = await eventsApi.patch(`/events/${eventId}`, body);
  return response.data;
};

export const leaveEvent = async (eventId, uid) => {
  const body = { uid };

  const response = await eventsApi.patch(`events/${eventId}/leave`, body);
  return response.data;
}

export const editEvent = async (eventId, eventData) => {
  const response = await eventsApi.patch(`/events/${eventId}/edit`, eventData);
  return response.data;
};

export const addEvent = async (eventData) => {
  const response = await eventsApi.post("/events", eventData);
  return response.data;
};

export const deleteEvent = async (eventId) => {
  const response = await eventsApi.delete(`/events/${eventId}`);
  return response.data;
};

export const addUser = async (userData) => {
  const response = await eventsApi.post("/users", userData);
  return response.data;
};
