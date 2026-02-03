const mongoose = require("mongoose");

const TeamMemberSchema = new mongoose.Schema(
    {
        teamId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Team",
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        role: {
            type: String,
            enum: ["manager", "member"],
            default: "member",
        },
        status: {
            type: String,
            enum: ["active", "removed"],
            default: "active",
        },
    },
    { timestamps: true },
);

TeamMemberSchema.index({ teamId: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model("TeamMember", TeamMemberSchema);
