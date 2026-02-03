const userModel = require("../models/user.model");
const transporter = require("../services/mail.service");
const bcrypt = require("bcrypt");
const mailTemplate = require("../templates/mail");

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
        const { id } = req.user;
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

const createControl = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ msg: "All fields are required" });
        }

        const isExist = await userModel.findOne({
            $or: [{ username }, { email }],
        });

        if (isExist) {
            return res.status(409).json({ msg: "User already exists" });
        }

        const hashPass = await bcrypt.hash(password, 10);

        await transporter.sendMail({
            from: '"Your App Name" <no-reply@yourapp.com>',
            to: email,
            subject: "Your Account Has Been Created",
            text: `Hello ${username},
                Your account has been created.

                Email: ${email}
                Password: ${password}

                Please change your password after login.`,
            html: mailTemplate(username, email, password),
        });

        const userCreate = await userModel.create({
            username,
            email,
            password: hashPass,
            role,
        });

        return res.status(201).json({ msg: "User created" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Server error" });
    }
};

const updateControl = async (req, res) => {
    try {
        const { id } = req.params;
        const { username } = req.body;

        if (!username) {
            return res.status(400).json({ msg: "Username is required" });
        }

        const user = await userModel.findByIdAndUpdate(
            id,
            { $set: { username } },
            { new: true, runValidators: true },
        );

        return res.status(200).json({
            success: true,
            msg: "User updated successfully",
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Server error" });
    }
};

const adminUpdateControl = async (req, res) => {
    try {
        const { id } = req.params;

        const allowedFields = ["email", "role", "status"];
        const updates = {};

        allowedFields.forEach((field) => {
            if (req.body[field] !== undefined) {
                updates[field] = req.body[field];
            }
        });

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({ msg: "No valid fields to update" });
        }

        const user = await userModel.findByIdAndUpdate(
            id,
            { $set: updates },
            { new: true, runValidators: true },
        );

        return res.status(200).json({
            success: true,
            msg: "Admin updated user successfully",
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Server error" });
    }
};

const deleteControl = async (req, res) => {
    try {
        const { id } = req.params;
        await userModel.findByIdAndDelete(id);
        return res.status(200).json({ msg: "Delete Success" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Server error" });
    }
};

module.exports = {
    readAllData,
    readData,
    createControl,
    updateControl,
    adminUpdateControl,
    deleteControl,
};
