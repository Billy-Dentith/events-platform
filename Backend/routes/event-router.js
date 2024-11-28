const { getEvents } = require("../controllers/event.controllers");

const eventRouter = require("express").Router();

eventRouter.get("/", getEvents);

module.exports = eventRouter; 