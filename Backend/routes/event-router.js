const { getEvents, joinEvent } = require("../controllers/event.controllers");

const eventRouter = require("express").Router();

eventRouter.get("/", getEvents);

eventRouter.patch("/:event_id", joinEvent); 

module.exports = eventRouter; 