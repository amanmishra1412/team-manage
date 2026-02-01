const userModel = require("../models/user.model");

const registerRoute = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        const isExist = await userModel.findOne({
            $or: [{ username }, { email }],
        });

        if (isExist) {
            return res.status(400).json({ msg: "User already exists" });
        }

        await userModel.create({
            username,
            email,
            password,
            role,
        });

        return res.status(201).json({ msg: "User created" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Server error" });
    }
};

module.exports = { registerRoute };
