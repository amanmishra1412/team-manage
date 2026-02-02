const jwt = require("jsonwebtoken");

const loginCheck = (req, res, next) => {
    try {
        const token = req.cookies?.token;
        if (!token) {
            return res
                .status(401)
                .json({ msg: "Token missing. Login required" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECERET);

        req.user = decoded;

        next();
    } catch (err) {
        console.log(err);
        return res.status(401).json({ msg: "Invalid or expired token" });
    }
};

const adminOnly = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ msg: "Admin only" });
    }
    next();
};

module.exports = { loginCheck, adminOnly };
