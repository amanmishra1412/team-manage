const mongoose = require("mongoose");

const ConnectDb = async () => {
    await mongoose
        .connect(process.env.MONGO_URI)
        .then(() => {
            console.log("Connect");
        })
        .catch((err) => {
            console.log(err);
        });
};

module.exports = ConnectDb;
