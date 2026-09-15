const User = require("../models/user.model");
const Notice = require("../models/notice.model");
const Complaint = require("../models/complaint.model");
const Event = require("../models/event.model");
const Resource = require("../models/resource.model");
const Request = require("../models/request.model");

const getDashboardStats = async (req, res) => {
    try {
        const totalStudents = await User.countDocuments({
            role: "student"
        });

        const totalNotices = await Notice.countDocuments();

        const totalComplaints = await Complaint.countDocuments();

        const pendingComplaints = await Complaint.countDocuments({
            status: "pending"
        });

        const totalEvents = await Event.countDocuments();

        const totalResources = await Resource.countDocuments();

        const totalRequests = await Request.countDocuments();

        const pendingRequests = await Request.countDocuments({
            status: "pending"
        });

        res.status(200).json({
            message: "Dashboard statistics fetched successfully",
            stats: {
                totalStudents,
                totalNotices,
                totalComplaints,
                pendingComplaints,
                totalEvents,
                totalResources,
                totalRequests,
                pendingRequests
            }
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch dashboard statistics",
            error: error.message
        });
    }
};

module.exports = {
    getDashboardStats
};