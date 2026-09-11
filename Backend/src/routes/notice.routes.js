const express = require("express");

const { createNotice } = require("../controllers/notice.controller");
const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");

const router = express.Router();

router.post(
    "/",
    authMiddleware,
    roleMiddleware(["admin"]),
    createNotice
);

module.exports = router;