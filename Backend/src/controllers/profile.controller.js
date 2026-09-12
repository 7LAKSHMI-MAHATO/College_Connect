const User = require("../models/user.model");
const Profile = require("../models/profile.model");
const imagekit = require("../config/imagekit");
const multer = require("multer");

const upload = multer({
    storage: multer.memoryStorage()
});

const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const profile = await Profile.findOne({
            user: req.user.id
        });

        res.status(200).json({
            message: "Profile fetched successfully",
            user,
            profile
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch profile",
            error: error.message
        });
    }
};

const updateProfile = async (req, res) => {
    try {
        const {
            department,
            semester,
            bio,
            skills
        } = req.body;

        const profile = await Profile.findOneAndUpdate(
            { user: req.user.id },
            {
                user: req.user.id,
                department,
                semester,
                bio,
                skills
            },
            {
                new: true,
                upsert: true,
                runValidators: true
            }
        );

        res.status(200).json({
            message: "Profile updated successfully",
            profile
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to update profile",
            error: error.message
        });
    }
};


const uploadProfileImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "Profile image is required"
            });
        }

        const result = await imagekit.upload({
            file: req.file.buffer,
            fileName: `profile-${req.user.id}.jpg`,
            folder: "/college-connect/profiles"
        });

        const profile = await Profile.findOneAndUpdate(
            { user: req.user.id },
            {
                user: req.user.id,
                profileImage: result.url
            },
            {
                new: true,
                upsert: true,
                runValidators: true
            }
        );

        res.status(200).json({
            message: "Profile image uploaded successfully",
            profile
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to upload profile image",
            error: error.message
        });
    }
};

module.exports = {
    getProfile,
    updateProfile,
    uploadProfileImage,
    upload
};