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

const getAllComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.find()
            .populate("student", "name email")
            .sort({ createdAt: -1 });

        res.status(200).json({
            message: "Complaints fetched successfully",
            complaints
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch complaints",
            error: error.message
        });
    }
};

const updateComplaintStatus = async (req, res) => {
    try {
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({
                message: "Status is required"
            });
        }

        const allowedStatuses = [
            "pending",
            "in-progress",
            "resolved"
        ];

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                message: "Invalid status"
            });
        }

        const complaint = await Complaint.findById(req.params.id);

        if (!complaint) {
            return res.status(404).json({
                message: "Complaint not found"
            });
        }

        complaint.status = status;

        await complaint.save();

        res.status(200).json({
            message: "Complaint status updated successfully",
            complaint
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to update complaint status",
            error: error.message
        });
    }
};

const getMyComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.find({
            student: req.user.id
        }).sort({ createdAt: -1 });

        res.status(200).json({
            message: "Your complaints fetched successfully",
            complaints
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch your complaints",
            error: error.message
        });
    }
};

module.exports = {
    createComplaint,
    getAllComplaints,
    updateComplaintStatus,
    getMyComplaints
};