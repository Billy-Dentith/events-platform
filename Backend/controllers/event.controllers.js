const Event = require("../models/Event");
const User = require("../models/User");

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("attendees");
    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server Error" });
  }
};

exports.joinEvent = async (req, res) => {
  const { event_id } = req.params;
  const { uid } = req.body;

  try {
    const user = await User.findById(uid);
    if (!user) res.status(404).send({ message: "User not found!" });

    const event = await Event.findById(event_id);
    if (!event) res.status(404).send({ message: "Event not found!" });
    
    if (!user.events.includes(event_id)) {
      user.events.push(event_id);
      await user.save();
    } else {
      return res.status(200).send({ message: "User has already joined this event!" });
    }    

    if (!event.attendees.includes(uid)) {
      event.attendees.push(uid);
      await event.save();
    } else {
      return res.status(200).send({ message: "User has already joined this event!" });
    }

    res.status(200).send({ message: "User successfully joined the event!" });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

exports.addEvent = async(req, res) => {
  const { title, description, date, location, maxSpaces, category, organizer, cost } = req.body; 

  try {
    const event = new Event({
      title,
      description,
      date,
      location,
      maxSpaces,
      category,
      organizer,
      cost,
    })

    await event.save();

    res.status(200).send(event);
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}