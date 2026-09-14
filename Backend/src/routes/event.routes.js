const express = require("express");

const {
    createEvent,
    getEvents,
    updateEvent,
    deleteEvent
} = require("../controllers/event.controller");

const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");

const router = express.Router();
router.get(
    "/",
    authMiddleware,
    getEvents
);

router.post(
    "/",
    authMiddleware,
    roleMiddleware(["admin"]),
    createEvent
);


router.put(
    "/:id",
    authMiddleware,
    roleMiddleware(["admin"]),
    updateEvent
);

router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware(["admin"]),
    deleteEvent
);

module.exports = router;