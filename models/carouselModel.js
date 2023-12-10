const mongoose = require('mongoose');

const carouselSchema = mongoose.Schema({
    author: String,
    sayings: String,
    image: String
});

const CarouselModel = mongoose.model("Carousel", carouselSchema);

module.exports = CarouselModel;