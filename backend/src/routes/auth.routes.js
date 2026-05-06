const express = require("express");
const {
    loginControl,
    registerControl,
    logoutControl,
    getMeControl,
} = require("../controllers/auth.controller");

const { loginCheck } = require("../middlewares/auth");

const router = express.Router();

router.get("/", (req, res) => {
    res.send("hello");
});

router.post("/login", loginControl);
router.post("/register", registerControl);
router.get("/get-me", loginCheck, getMeControl);
router.get("/logout", loginCheck, logoutControl);

module.exports = router;
