const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    subject: {
        type: String,
        require: true
    },
    message: {
        type: String,
        require: true
    },
    read: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const User = mongoose.model("Contact", contactSchema);


module.exports = User;