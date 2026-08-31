const express = require("express");

const {
    getClients,
    addClient
} = require("../controllers/clientController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get(
    "/",
    authMiddleware,
    getClients
);

router.post(
    "/",
    authMiddleware,
    addClient
);

module.exports = router;