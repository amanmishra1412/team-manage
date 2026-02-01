const mongoose = require("mongoose");

const userModle = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 30,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            select: false,
        },
        role: {
            type: String,
            enum: ["admin", "manager", "user"],
            default: "user",
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model("User", userModle);
