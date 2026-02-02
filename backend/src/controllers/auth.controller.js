const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerControl = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        const isExist = await userModel.findOne({
            $or: [{ username }, { email }],
        });

        if (isExist) {
            return res
                .status(400)
                .json({ msg: "User already exists", isExist });
        }

        const hashPass = await bcrypt.hash(password, 10);

        const userCreate = await userModel.create({
            username,
            email,
            password: hashPass,
            role,
        });

        return res.status(201).json({ msg: "User created", userCreate });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Server error" });
    }
};

const loginControl = async (req, res) => {
    try {
        const { email, password } = req.body;

        const isExist = await userModel.findOne({ email });
        console.log(isExist);

        if (!isExist) {
            return res.status(404).json({ msg: "No User" });
        }

        const checkPass = await bcrypt.compare(password, isExist.password);

        if (!checkPass) {
            return res.status(400).json({ msg: "Wrong Password" });
        }

        const token = jwt.sign(
            {
                id: isExist._id,
                role: isExist.role,
            },
            process.env.JWT_SECERET,
        );

        return res.status(200).json({
            msg: "Login successful",
            token,
            user: {
                id: isExist._id,
                username: isExist.username,
                email: isExist.email,
                role: isExist.role,
            },
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Server error" });
    }
};

module.exports = { registerControl, loginControl };
