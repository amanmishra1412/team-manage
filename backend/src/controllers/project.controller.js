const Team = require("../models/team.model");
const TeamMember = require("../models/teammember.model");

const readProject = async (req, res) => {
    try {
        
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Server Error" });
    }
};

const createProject = async (req, res) => {
    try {
        
    } catch (err) {
        console.error(err);

        if (err.code === 11000) {
            return res.status(409).json({ msg: "Team already exists" });
        }

        return res.status(500).json({ msg: "Server Error" });
    }
};

const deleteProject = async (req,res)=>{
    try {
        
    } catch (err) {
        console.log(err)
        return res.status(500).json({ msg: "Server Error" });
    }
}


module.exports = { createProject, readProject, deleteProject};
