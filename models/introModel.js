const mongoose = require('mongoose');

const introSchema = mongoose.Schema({
    title: String,
    description: String,
    image: String
});

const introModel = mongoose.model("Intro", introSchema);

module.exports = introModel;