const mongoose = require('mongoose')
const schema = mongoose.Schema

const userSchema = new schema({
    username: {
        type: String,
        // required: true,
        // minlength : 8,
        // maxlength : 30,
        // unique : true
    },
    email: {
        type: String,
        // required: true,
        // minlength : 10,
        // maxlength : 500,
        // unique : true
    },
    password: {
        type: String,
        // required: true,
        // minlength : 8,
    },
    admin: {
        type: Boolean,
        default: true
    }
}, {
    timestamps : true
})

const userModel = mongoose.model("users",userSchema)
module.exports = userModel;