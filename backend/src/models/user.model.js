const mongoose = require("mongoose");

const userModel = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 30,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ["admin", "manager", "user"],
            default: "user",
        },
        status: {
            type: String,
            enum: ["active", "blocked"],
            default: "active",
        },
        workspaceId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Workspace",
            required: true,
        },

    },
    { timestamps: true }
);

module.exports = mongoose.model("User", userModel);