const mongoose = require("mongoose");

const priceSchema = new mongoose.Schema({
    title: {
        type: String
    },
    price: {
        type: Number
    },
    classDuration: String,
    daysInWeek: String,
    admissionFees: String,
    discount: String,
})

const Price = new mongoose.model("Price", priceSchema);

module.exports = Price; 