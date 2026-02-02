const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

const loginControl = async (req, res) => {
    try {
        const { email, password } = req.body;

        const isExist = await userModel.findOne({ email });

        if (!isExist) {
            return res.status(401).json({ msg: "No User" });
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

        res.cookie("token", token);

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

const logoutControl = (req, res) => {
    res.clearCookie("token");
    return res.status(200).json({ msg: "Logout Success" });
};

module.exports = { loginControl, logoutControl };
