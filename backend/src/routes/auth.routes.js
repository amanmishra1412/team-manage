const express = require("express");
const { registerRoute } = require("../controllers/auth.controller");

const router = express.Router();

router.get("/", (req, res) => {
    res.send("hello");
});

router.post("/register", registerRoute);

module.exports = router;
