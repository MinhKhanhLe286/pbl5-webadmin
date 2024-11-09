const mongoose = require('mongoose')
const schema = mongoose.Schema

const schemaSensor = new schema({
    temperature : Number,
    soil : Number,
    humidity : Number,
    createDate : Date
},{
    timestamps : true
})

const sensorModel = mongoose.model("sensor",schemaSensor, "sensors");
module.exports = sensorModel;