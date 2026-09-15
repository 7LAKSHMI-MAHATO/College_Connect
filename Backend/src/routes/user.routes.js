const express = require("express");

const { registerUser } = require("../controllers/user.controller");
const { loginUser } = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");
const { getProfile } = require("../controllers/profile.controller");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);


router.get("/me", authMiddleware, (req, res) => {
    res.status(200).json({
        message: "You are authenticated",
        user: req.user
    });
});


router.get(
    "/profile",
    authMiddleware,
    getProfile
);


// router.get("/profile", authMiddleware, getProfile);
// router.get(
//     "/student-test",
//     authMiddleware,
//     roleMiddleware(["student"]),
//     (req, res) => {
//         res.status(200).json({
//             message: "Student access granted"
//         });
//     }
// );

// router.get(
//     "/admin-test",
//     authMiddleware,
//     roleMiddleware(["admin"]),
//     (req, res) => {
//         res.status(200).json({
//             message: "Admin access granted"
//         });
//     }
// );

module.exports = router;