const express = require("express");
const {
    readAllData,
    readData,
    createControl,
    deleteControl,
    updateControl,
    adminUpdateControl,
} = require("../controllers/user.controller");

const { loginCheck, adminOnly } = require("../middlewares/auth");
const router = express.Router();

// Admin Routes
router.get("/", loginCheck, adminOnly, readAllData);
router.post("/", loginCheck, adminOnly, createControl);
router.patch("/:id", loginCheck, adminOnly, adminUpdateControl);
router.delete("/:id", loginCheck, adminOnly, deleteControl);

// User / Manager Routes
router.get("/me", loginCheck, readData);
router.patch("/me", loginCheck, updateControl);

module.exports = router;
