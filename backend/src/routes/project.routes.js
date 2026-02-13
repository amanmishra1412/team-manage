const express = require("express");
const { loginCheck, adminOnly } = require("../middlewares/auth");
const {
    readProject,
    createProject,
    deleteProject,
} = require("../controllers/project.controller");
const router = express.Router();

router.get("/", loginCheck, adminOnly, readProject);
router.post("/", loginCheck, adminOnly, createProject);
router.delete("/:id", loginCheck, adminOnly, deleteProject);

module.exports = router;
