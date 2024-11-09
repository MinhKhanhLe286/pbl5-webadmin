const mongoose = require('mongoose');

async function connectMongoDB() {
    try {
        await mongoose.connect("mongodb://localhost/sensorPBL");
        console.log("Connection to MongoDB successfully!");
        console.log("#############################");
    } catch (error) {
        console.log("Connection to MongoDB failed!");
        console.log("#############################");
    }
}

module.exports = connectMongoDB;
