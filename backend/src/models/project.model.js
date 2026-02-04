const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
        },
        description: {
            type: String,
            trim: true,
        },
        teamId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Team",
            required: true,
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model("Project", ProjectSchema);
