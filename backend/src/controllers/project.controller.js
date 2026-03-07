const ProjectModel = require("../models/project.model");

const readProject = async (req, res) => {
    try {
        const user = req.user;

        let projects;

        // Admin → all projects
        if (user.role === "admin") {
            projects = await ProjectModel.find()
                .populate("teamLead", "name email")
                .populate("members", "name email");
        }

        // Manager → projects where he is teamLead
        else if (user.role === "manager") {
            projects = await ProjectModel.find({ teamLead: user._id })
                .populate("teamLead", "name email")
                .populate("members", "name email");
        }

        // User → projects where he is member
        else {
            projects = await ProjectModel.find({ members: user._id })
                .populate("teamLead", "name email")
                .populate("members", "name email");
        }

        return res.status(200).json({
            success: true,
            count: projects.length,
            projects
        });

    } catch (err) {
        return res.status(500).json({
            msg: "Server Error",
            err: err.message
        });
    }
};

const createProject = async (req, res) => {
    try {
        const { title, description, teamLead, members, deadline } = req.body;

        if (!title || !description || !teamLead || !deadline) {
            return res.status(400).json({ msg: "Some fields are missing" });
        }

        const project = await ProjectModel.create({
            title,
            description,
            teamLead,
            members: members || [],
            deadline,
        });

        return res.status(201).json({
            success: true,
            msg: "Project created successfully",
            project
        });

    } catch (err) {
        return res.status(500).json({ msg: "Server Error", err: err.message });
    }
};

const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;
        await ProjectModel.findByIdAndDelete(id);
        return res.status(200).json({ msg: "Delete Success" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "Server Error" });
    }
};

module.exports = { createProject, readProject, deleteProject };
