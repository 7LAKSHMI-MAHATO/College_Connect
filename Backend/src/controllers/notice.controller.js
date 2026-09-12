const Notice = require("../models/notice.model");

const createNotice = async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!title || !description) {
            return res.status(400).json({
                message: "Title and description are required"
            });
        }

        const notice = await Notice.create({
            title,
            description,
            createdBy: req.user.id
        });

        res.status(201).json({
            message: "Notice created successfully",
            notice
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to create notice",
            error: error.message
        });
    }
};


const getNotices = async (req, res) => {
    try {
        const notices = await Notice.find()
            .populate("createdBy", "name email")
            .sort({ createdAt: -1 });

        res.status(200).json({
            message: "Notices fetched successfully",
            notices
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch notices",
            error: error.message
        });
    }
};

const updateNotice = async (req, res) => {
    try {
        const { title, description } = req.body;

        const notice = await Notice.findById(req.params.id);

        if (!notice) {
            return res.status(404).json({
                message: "Notice not found"
            });
        }

        notice.title = title || notice.title;
        notice.description = description || notice.description;

        await notice.save();

        res.status(200).json({
            message: "Notice updated successfully",
            notice
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to update notice",
            error: error.message
        });
    }
};

const deleteNotice = async (req, res) => {
    try {
        const notice = await Notice.findById(req.params.id);

        if (!notice) {
            return res.status(404).json({
                message: "Notice not found"
            });
        }

        await Notice.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Notice deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to delete notice",
            error: error.message
        });
    }
};
module.exports = {
    createNotice , getNotices, updateNotice, deleteNotice
};