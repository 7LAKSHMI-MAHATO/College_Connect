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

module.exports = {
    createNotice
};