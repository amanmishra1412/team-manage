const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Task title is required"]
        },

        description: {
            type: String,
        },

        project: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project",
            required: true
        },

        assignedTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        deadline: {
            type: Date,
        },

        status: {
            type: String,
            enum: ["in-progress", "completed"],
            default: "in-progress"
        },

        priority: {
            type: String,
            enum: ["low", "medium", "high"],
            default: "medium"
        }

    },
    {
        timestamps: true
    });

const taskModel = mongoose.model("Task", taskSchema);

module.exports = taskModel;