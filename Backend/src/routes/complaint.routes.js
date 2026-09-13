const express = require("express");

const {
    createComplaint,
    getAllComplaints,
    updateComplaintStatus,
    getMyComplaints
} = require("../controllers/complaint.controller");

const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");

const router = express.Router();

router.get(
    "/",
    authMiddleware,
    roleMiddleware(["admin"]),
    getAllComplaints
);

router.get(
    "/my",
    authMiddleware,
    roleMiddleware(["student"]),
    getMyComplaints
);

router.put(
    "/:id/status",
    authMiddleware,
    roleMiddleware(["admin"]),
    updateComplaintStatus
);

router.post(
    "/",
    authMiddleware,
    roleMiddleware(["student"]),
    createComplaint
);


module.exports = router;