const express = require("express");
const { loginCheck, adminOnly } = require("../middlewares/auth");
const {
    createTeam,
    readTeam,
    deleteTeam,
} = require("../controllers/team.controller");
const router = express.Router();

router.get("/", loginCheck, adminOnly, readTeam);
router.post("/", loginCheck, adminOnly, createTeam);
router.delete("/:id", loginCheck, adminOnly, deleteTeam);

module.exports = router;
