const ProjectSchema = require("../models/project.model");

const readProject = async (req, res) => {
    try {
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Server Error" });
    }
};

const createProject = async (req, res) => {
    try {
        const { title, description, teamId } = req.body;

        const checkExist = await ProjectSchema.findOne({ teamId });

        if (checkExist) {
            return res
                .status(404)
                .json({ msg: "Team Work on another Project" });
        }

        const project = await ProjectSchema.create({
            title,
            description,
            teamId,
        });
    } catch (err) {
        console.error(err);

        return res.status(500).json({ msg: "Server Error" });
    }
};

const deleteProject = async (req, res) => {
    try {
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "Server Error" });
    }
};

module.exports = { createProject, readProject, deleteProject };
