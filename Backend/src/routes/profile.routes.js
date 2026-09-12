const express = require("express");

const {
    getProfile,
    updateProfile,
    uploadProfileImage,
    upload
} = require("../controllers/profile.controller");

const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.get(
    "/",
    authMiddleware,
    getProfile
);

router.put(
    "/",
    authMiddleware,
    updateProfile
);
router.put(
    "/image",
    authMiddleware,
    upload.single("profileImage"),
    uploadProfileImage
);

module.exports = router;