const mongoose = require("mongoose");


const socialSchema = new mongoose.Schema({
    facebook: {
        type: String,
        require: true
    },
    whatsapp: {
        type: String,
        require: true
    },
    youtube: {
        type: String,
        require: true
    }
})

const SocialMediaModel = new mongoose.model("SocialMedia", socialSchema);

module.exports = SocialMediaModel;