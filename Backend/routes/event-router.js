const { getEvents, joinEvent, addEvent, removeEvent, editEvent, leaveEvent } = require("../controllers/event.controllers");

const eventRouter = require("express").Router();

eventRouter.get("/", getEvents);

eventRouter.patch("/:event_id", joinEvent); 
eventRouter.patch("/:event_id/edit", editEvent);
eventRouter.patch("/:event_id/leave", leaveEvent);

eventRouter.post("/", addEvent);

eventRouter.delete("/:event_id", removeEvent);

module.exports = eventRouter; 