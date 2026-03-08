const express = require("express");
const { loginCheck, adminOnly } = require("../middlewares/auth");
const {
    readProject,
    getSingleProject,
    createProject,
    deleteProject,
    updateProject
} = require("../controllers/project.controller");
const router = express.Router();

router.get("/", loginCheck, adminOnly, readProject);
router.get("/:id", loginCheck, getSingleProject);
router.post("/", loginCheck, adminOnly, createProject);
router.put("/:id", loginCheck, adminOnly, updateProject);
router.delete("/:id", loginCheck, adminOnly, deleteProject);

module.exports = router;