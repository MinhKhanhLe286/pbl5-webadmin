require("dotenv").config();
const mongoose = require('mongoose');

async function connectMongoDB() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connection to MongoDB successfully!");
        console.log("#############################");
    } catch (error) {
        console.log("Connection to MongoDB failed!");
        console.log("#############################");
    }
}

module.exports = connectMongoDB;
