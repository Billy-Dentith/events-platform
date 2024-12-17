const Event = require("../models/Event");
const User = require("../models/User");
const Joi = require('joi');

const eventUpdateSchema = Joi.object({
  title: Joi.string().min(3),
  description: Joi.string(),
  date: Joi.string()
  .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z?$/)
  .messages({
    'string.pattern.base': 'Date must be in ISO 8601 format with time (e.g., 2025-05-10T14:30:00Z)',
  }),
  location: Joi.string(),
  maxSpaces: Joi.number().min(1),
  category: Joi.string(),
  organizer: Joi.string(),
  attendees: Joi.array().items(Joi.string()),
  cost: Joi.number().min(0)
})

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

exports.leaveEvent = async (req, res) => {
  const { event_id } = req.params;
  const { uid } = req.body;

  try {
    const user = await User.findById(uid);
    if (!user) res.status(404).send({ message: "User not found!" });

    const event = await Event.findById(event_id);
    if (!event) res.status(404).send({ message: "Event not found!" }); 

    if (!user.events.includes(event_id)) {
      return res.status(200).send({ message: "User has already left this event!" });
    } else {
      await User.updateOne({ _id: uid}, { $pull: { events: event_id }})
    }    

    if (!event.attendees.includes(uid)) {
      return res.status(200).send({ message: "User has already left this event!" });
    } else {
      await Event.updateOne({ _id: event_id }, { $pull: { attendees: uid }})
    }

    res.status(200).send({ message: "User successfully left the event!" });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
}

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

exports.removeEvent = async (req, res) => {
  const { event_id } = req.params; 

  try {
    const deletedEvent = await Event.findByIdAndDelete(event_id)

    res.status(200).send(deletedEvent);
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}

exports.editEvent = async (req, res) => {
  const { event_id } = req.params;
  const updates = req.body;  

  const { error } = eventUpdateSchema.validate(req.body);

  if (error) {
    return res.status(400).send({ message: error.details[0].message }); 
  }

  try {
    const event = await Event.findByIdAndUpdate(event_id, updates, { new: true, runValidators: true });

    if (!event) {
      return res.status(404).send({ message: "Event not found!" });
    }

    return res.status(200).send(event); 
  } catch (error) {
    return res.status(400).send({ message: error.message }); 
  }
}