const mongoose = require('mongoose')
const schema = mongoose.Schema

const schemaSensor = new schema({
    temperature : Number,
    soil : Number,
    humidity : Number,
    light : Number
},{
    timestamps : true
})

const sensorModel = mongoose.model("sensors",schemaSensor,);
module.exports = sensorModel;