const { getEvents, joinEvent, addEvent } = require("../controllers/event.controllers");

const eventRouter = require("express").Router();

eventRouter.get("/", getEvents);

eventRouter.patch("/:event_id", joinEvent); 

eventRouter.post("/", addEvent);

module.exports = eventRouter; 