const express = require("express");

const {
    createRequest,
    getMyRequests,
    getAllRequests,
    updateRequestStatus
    
} = require("../controllers/request.controller");

const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");

const router = express.Router();

router.post(
    "/",
    authMiddleware,
    roleMiddleware(["student"]),
    createRequest
);

router.get(
    "/my",
    authMiddleware,
    roleMiddleware(["student"]),
    getMyRequests
);

router.get(
    "/",
    authMiddleware,
    roleMiddleware(["admin"]),
    getAllRequests
);

router.put(
    "/:id/status",
    authMiddleware,
    roleMiddleware(["admin"]),
    updateRequestStatus
);

module.exports = router;