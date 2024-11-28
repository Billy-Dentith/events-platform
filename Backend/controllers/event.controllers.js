const Event = require("../models/Event");
const User = require("../models/User");

exports.getEvents = async (req, res) => {
    try {
        const events = await Event.find().populate("attendees");
        res.json(events); 
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Server Error" })
    }
}