const express = require("express");
const Event = require("../models/Event");
const router = express.Router();

async function nextEventId() {
  const last = await Event.findOne().sort({ createdAt: -1 });
  let n = 1;
  if (last && last.eventId) {
    const parsed = parseInt(last.eventId.replace("EVT-", ""), 10);
    if (!isNaN(parsed)) n = parsed + 1;
  }
  return `EVT-${String(n).padStart(3, "0")}`;
}

router.get("/", async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, description, date, venue, totalRegistrations } = req.body;
    if (!name || !description || !date || !venue) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const eventId = await nextEventId();
    const event = await Event.create({
      eventId,
      name,
      description,
      date,
      venue,
      totalRegistrations: totalRegistrations || 0,
    });
    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { name, description, date, venue, totalRegistrations } = req.body;
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      { name, description, date, venue, totalRegistrations },
      { new: true, runValidators: true }
    );
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json({ message: "Event deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
