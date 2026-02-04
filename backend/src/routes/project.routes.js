const express = require("express");
const { loginCheck, adminOnly } = require("../middlewares/auth");
const { readProject, createProject } = require("../controllers/project.controller");
const router = express.Router();

router.get("/", loginCheck, adminOnly, readProject);
router.post("/", loginCheck, adminOnly, createProject);

module.exports = router;
