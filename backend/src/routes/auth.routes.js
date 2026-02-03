const express = require("express");
const {
    loginControl,
    logoutControl,
} = require("../controllers/auth.controller");

const { loginCheck } = require("../middlewares/auth");

const router = express.Router();

router.get("/", (req, res) => {
    res.send("hello");
});

router.post("/login", loginControl);
router.get("/logout", loginCheck, logoutControl);

module.exports = router;
