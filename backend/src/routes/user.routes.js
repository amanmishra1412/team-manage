const express = require("express");
const { readAllData, readData } = require("../controllers/user.controller");
const { loginCheck, adminOnly } = require("../middlewares/auth");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("hello");
});

router.get("/read", loginCheck, adminOnly, readAllData);
router.get("/readuser", loginCheck, readData);

module.exports = router;
