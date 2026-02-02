const userModel = require("../models/user.model");

const readAllData = async (req, res) => {
    try {
        const users = await userModel
            .find({}, { password: 0 })
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            count: users.length,
            data: users,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

const readData = async (req, res) => {
    try {
        const { id, role } = req.user;
        const users = await userModel.findById(id, { password: 0 });
        return res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            data: users,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

module.exports = { readAllData, readData };
