const Resource = require("../models/resource.model");

const createResource = async (req, res) => {
    try {
        const {
            title,
            description,
            type,
            url
        } = req.body;

        if (!title || !description || !type || !url) {
            return res.status(400).json({
                message: "Title, description, type and URL are required"
            });
        }

        const resource = await Resource.create({
            title,
            description,
            type,
            url,
            createdBy: req.user.id
        });

        res.status(201).json({
            message: "Resource created successfully",
            resource
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to create resource",
            error: error.message
        });
    }
};

const getResources = async (req, res) => {
    try {
        const resources = await Resource.find()
            .populate("createdBy", "name email")
            .sort({ createdAt: -1 });

        res.status(200).json({
            message: "Resources fetched successfully",
            resources
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch resources",
            error: error.message
        });
    }
};

const updateResource = async (req, res) => {
    try {
        const {
            title,
            description,
            type,
            url
        } = req.body;

        const resource = await Resource.findById(req.params.id);

        if (!resource) {
            return res.status(404).json({
                message: "Resource not found"
            });
        }

        resource.title = title || resource.title;
        resource.description = description || resource.description;
        resource.type = type || resource.type;
        resource.url = url || resource.url;

        await resource.save();

        res.status(200).json({
            message: "Resource updated successfully",
            resource
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to update resource",
            error: error.message
        });
    }
};

const deleteResource = async (req, res) => {
    try {
        const resource = await Resource.findById(req.params.id);

        if (!resource) {
            return res.status(404).json({
                message: "Resource not found"
            });
        }

        await Resource.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Resource deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to delete resource",
            error: error.message
        });
    }
};

module.exports = {
    createResource,
    getResources,
    updateResource,
    deleteResource

};