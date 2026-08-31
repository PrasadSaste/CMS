const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");

const schema = require("../data/schema.json");

const router = express.Router();

router.get(
    "/",
    authMiddleware,
    (req, res) => {

        res.status(200).json(schema);

    }
);

module.exports = router;