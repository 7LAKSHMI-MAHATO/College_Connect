const Request = require("../models/request.model");

const createRequest = async (req, res) => {
    try {
        const { subject, description } = req.body;

        if (!subject || !description) {
            return res.status(400).json({
                message: "Subject and description are required"
            });
        }

        const request = await Request.create({
            student: req.user.id,
            subject,
            description
        });

        res.status(201).json({
            message: "Request submitted successfully",
            request
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to submit request",
            error: error.message
        });
    }
};

const getMyRequests = async (req, res) => {
    try {
        const requests = await Request.find({
            student: req.user.id
        }).sort({ createdAt: -1 });

        res.status(200).json({
            message: "Your requests fetched successfully",
            requests
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch your requests",
            error: error.message
        });
    }
};

const getAllRequests = async (req, res) => {
    try {
        const requests = await Request.find()
            .populate("student", "name email")
            .sort({ createdAt: -1 });

        res.status(200).json({
            message: "Requests fetched successfully",
            requests
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch requests",
            error: error.message
        });
    }
};

const updateRequestStatus = async (req, res) => {
    try {
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({
                message: "Status is required"
            });
        }

        const allowedStatuses = [
            "pending",
            "approved",
            "rejected"
        ];

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                message: "Invalid status"
            });
        }

        const request = await Request.findById(req.params.id);

        if (!request) {
            return res.status(404).json({
                message: "Request not found"
            });
        }

        request.status = status;

        await request.save();

        res.status(200).json({
            message: "Request status updated successfully",
            request
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to update request status",
            error: error.message
        });
    }
};

module.exports = {
    createRequest,
    getMyRequests,
    getAllRequests,
    updateRequestStatus
};

    