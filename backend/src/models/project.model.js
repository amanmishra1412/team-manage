const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Project title is required"],
            trim: true,
        },

        description: {
            type: String,
            trim: true,
        },

        teamLead: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },

        members: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],

        deadline: {
            type: Date,
            required: [true, "Deadline is important"],
        },

        status: {
            type: String,
            enum: ["active", "completed", "on_hold"],
            default: "active",
        },
    },
    { timestamps: true }
);

const ProjectModel = mongoose.model("Project", ProjectSchema);

module.exports = ProjectModel;