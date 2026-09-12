const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true
        },

        department: {
            type: String,
            trim: true
        },

        semester: {
            type: Number
        },

        bio: {
            type: String,
            trim: true
        },

        skills: {
            type: [String],
            default: []
        },

        profileImage: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true
    }
);

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;