const Complaint = require("../models/complaint.model");

const createComplaint = async (req, res) => {
    try {
        const { subject, description } = req.body;

        if (!subject || !description) {
            return res.status(400).json({
                message: "Subject and description are required"
            });
        }

        const complaint = await Complaint.create({
            student: req.user.id,
            subject,
            description
        });

        res.status(201).json({
            message: "Complaint submitted successfully",
            complaint
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to submit complaint",
            error: error.message
        });
    }
};

module.exports = {
    createComplaint
};