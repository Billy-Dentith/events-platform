const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/\S+@\S+\.\S+/, "Please provide a valid email address"],
  },
  role: {
    type: String,
    required: true,
    enum: ["attendee", "staff", "admin"],
  },
  createdAt: { type: Date, default: Date.now },
  events: { type: [mongoose.Schema.Types.ObjectId], ref: "Event", default: [] }, 
});

module.exports = mongoose.model("User", userSchema);