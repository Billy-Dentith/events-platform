const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true, minlength: 3 },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    maxSpaces: { type: Number, required: true, min: 1 },
    category: { type: String },
    organizer: { type: String, required: true },
    attendees: { type: [String], ref: 'User', default: [] },
    cost: { type: Number, min: 0, required: true }
}, { collection: 'events'});


  module.exports = mongoose.model("Event", eventSchema)