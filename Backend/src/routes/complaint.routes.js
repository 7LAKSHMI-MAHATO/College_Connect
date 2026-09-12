const express = require("express");

const {
    createComplaint
} = require("../controllers/complaint.controller");

const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");

const router = express.Router();

router.post(
    "/",
    authMiddleware,
    roleMiddleware(["student"]),
    createComplaint
);

module.exports = router;