const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    eventId: { type: String, unique: true },
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    date: { type: Date, required: true },
    venue: { type: String, required: true, trim: true },
    totalRegistrations: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
