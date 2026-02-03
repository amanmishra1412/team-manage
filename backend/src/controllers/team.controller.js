const Team = require("../models/team.model");
const TeamMember = require("../models/teammember.model");

const readTeam = async (req, res) => {
    try {
        const teamMembers = await TeamMember.find({ status: "active" })
            .populate({
                path: "teamId",
                match: { status: "active" },
            })
            .populate("userId");

        const filtered = teamMembers.filter((tm) => tm.teamId !== null);

        return res.status(200).json({
            msg: "Active team data fetched",
            teamMembers: filtered,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Server Error" });
    }
};

const createTeam = async (req, res) => {
    try {
        const { name, description, userData } = req.body;

        if (!name) {
            return res.status(400).json({ msg: "Team name is required" });
        }

        const team = await Team.create({ name, description });

        if (Array.isArray(userData) && userData.length > 0) {
            const members = userData.map((elem) => ({
                teamId: team._id,
                userId: elem.userId,
                role: elem.role || "member",
            }));

            await TeamMember.insertMany(members);
        }

        return res.status(201).json({
            msg: "Team created successfully",
        });
    } catch (err) {
        console.error(err);

        if (err.code === 11000) {
            return res.status(409).json({ msg: "Team already exists" });
        }

        return res.status(500).json({ msg: "Server Error" });
    }
};

const deleteTeam = async (req, res) => {
    try {
        const { id } = req.params;

        const team = await Team.findById(id);
        if (!team) {
            return res.status(404).json({ msg: "Team not found" });
        }

        await Team.updateOne({ _id: id }, { $set: { status: "inactive" } });

        await TeamMember.updateMany(
            { teamId: id },
            { $set: { status: "removed" } },
        );

        return res.status(200).json({ msg: "Team deactivated successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Server Error" });
    }
};

module.exports = { createTeam, readTeam, deleteTeam };
