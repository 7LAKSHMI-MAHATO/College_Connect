const express = require("express");

const { createNotice , 
    getNotices,
updateNotice,
deleteNotice} = require("../controllers/notice.controller");
const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");

const router = express.Router();

router.get(
    "/",
    authMiddleware,
    getNotices
);

router.post(
    "/",
    authMiddleware,
    roleMiddleware(["admin"]),
    createNotice
);

router.put(
    "/:id",
    authMiddleware,
    roleMiddleware(["admin"]),
    updateNotice
);

router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware(["admin"]),
    deleteNotice
);

module.exports = router;