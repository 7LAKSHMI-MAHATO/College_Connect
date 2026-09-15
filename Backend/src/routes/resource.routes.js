const express = require("express");

const {
    createResource,
    getResources,
    updateResource,
    deleteResource
} = require("../controllers/resource.controller");

const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");

const router = express.Router();
router.get(
    "/",
    authMiddleware,
    getResources
);

router.post(
    "/",
    authMiddleware,
    roleMiddleware(["admin"]),
    createResource
);

router.put(
    "/:id",
    authMiddleware,
    roleMiddleware(["admin"]),
    updateResource
);

router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware(["admin"]),
    deleteResource
);

module.exports = router;