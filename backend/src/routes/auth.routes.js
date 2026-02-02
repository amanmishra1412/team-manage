const express = require("express");
const {
    registerControl,
    loginControl,
} = require("../controllers/auth.controller");

const router = express.Router();

router.get("/", (req, res) => {
    res.send("hello");
});

router.post("/register", registerControl);
router.post("/login", loginControl);

module.exports = router;
