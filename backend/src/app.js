require("dotenv").config();
const express = require("express");
const cors = require('cors');
const ConnectDb = require("./config/db");
const authRoute = require("./routes/auth.routes");
const userRoute = require("./routes/user.routes");
const projectRoute = require("./routes/project.routes");
const taskRoute = require("./routes/task.routes");
const cookieParser = require("cookie-parser");

const app = express();
ConnectDb();

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}))

app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Done");
});

// routes

app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/project", projectRoute);
app.use("/task", taskRoute);

module.exports = app;