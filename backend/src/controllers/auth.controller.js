const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const workspaceModel = require("../models/workspace.model")

const loginControl = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(401).json({ msg: "Invalid credentials" });
        }

        if (user.status === "blocked") {
            return res.status(403).json({ msg: "Account is blocked" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ msg: "Invalid credentials" });
        }

        const token = jwt.sign(
            {
                userId: user._id,
                role: user.role,
                workspaceId: user.workspaceId,
            },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
            msg: "Login successful",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
            },
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Server error" });
    }
};

const registerControl = async (req, res) => {
    try {
        const { username, email, password, workspaceName } = req.body;

        if (!username || !email || !password || !workspaceName) {
            return res.status(400).json({ msg: "All fields are required" });
        }

        const isExist = await userModel.findOne({ email });
        if (isExist) {
            return res.status(409).json({ msg: "Email already registered" });
        }

        const hashPass = await bcrypt.hash(password, 10);

        const workspace = await workspaceModel.create({
            name: workspaceName,
        });

        const user = await userModel.create({
            username,
            email,
            password: hashPass,
            role: "admin",
            workspaceId: workspace._id,
        });

        workspace.ownerId = user._id;
        await workspace.save();

        const token = jwt.sign(
            {
                userId: user._id,
                role: user.role,
                workspaceId: user.workspaceId,
            },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "Strict",
        });

        return res.status(201).json({
            msg: "Registration successful",
            token,
            user: {
                id: user._id,
                username: user.username,
                role: user.role,
            },
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Server error" });
    }
};

const logoutControl = (req, res) => {
    res.clearCookie("token");
    return res.status(200).json({ msg: "Logout Success" });
};

module.exports = { loginControl, registerControl, logoutControl };
