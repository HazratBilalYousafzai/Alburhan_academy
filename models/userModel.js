const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    contactNo: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },

    sports: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const User = mongoose.model("User", UserSchema);

module.exports = User;