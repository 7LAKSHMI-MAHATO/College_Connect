const Event = require("../models/event.model");

const createEvent = async (req, res) => {
    try {
        const {
            title,
            description,
            date,
            location
        } = req.body;

        if (!title || !description || !date || !location) {
            return res.status(400).json({
                message: "Title, description, date and location are required"
            });
        }

        const event = await Event.create({
            title,
            description,
            date,
            location,
            createdBy: req.user.id
        });

        res.status(201).json({
            message: "Event created successfully",
            event
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to create event",
            error: error.message
        });
    }
};

const getEvents = async (req, res) => {
    try {
        const events = await Event.find()
            .populate("createdBy", "name email")
            .sort({ date: 1 });

        res.status(200).json({
            message: "Events fetched successfully",
            events
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch events",
            error: error.message
        });
    }
};

const updateEvent = async (req, res) => {
    try {
        const {
            title,
            description,
            date,
            location
        } = req.body;

        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({
                message: "Event not found"
            });
        }

        event.title = title || event.title;
        event.description = description || event.description;
        event.date = date || event.date;
        event.location = location || event.location;

        await event.save();

        res.status(200).json({
            message: "Event updated successfully",
            event
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to update event",
            error: error.message
        });
    }
};

module.exports = {
    createEvent,
    getEvents,
    updateEvent
};