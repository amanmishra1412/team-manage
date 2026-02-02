const express = require("express");
const {
    registerControl,
    loginControl,
    logoutControl,
} = require("../controllers/auth.controller");
const { loginCheck, adminOnly } = require("../middlewares/auth");

const router = express.Router();

router.get("/", (req, res) => {
    res.send("hello");
});

router.post("/register", loginCheck, adminOnly, registerControl);
router.post("/login", loginControl);
router.post("/logout", loginCheck, logoutControl);

module.exports = router;
