require("dotenv").config();
const express = require("express");
const ConnectDb = require("./config/db");
const authRoute = require("./routes/auth.routes");
const userRoute = require("./routes/user.routes");
const teamRoute = require("./routes/team.routes");
const projectRoute = require("./routes/project.routes");
const cookieParser = require("cookie-parser");

const app = express();
ConnectDb();

app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Done");
});

// routes

app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/team", teamRoute);
app.use("/project", projectRoute);

module.exports = app;
