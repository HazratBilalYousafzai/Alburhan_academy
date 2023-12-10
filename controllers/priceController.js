const mongoose = require("mongoose");
const priceModel = require("../models/priceModel");

const addOffer = async (req, res) => {
    try {
        const { title, price, classDuration, daysInWeek, admissionFees, discount } = req.body;
        if (!title || !price || !classDuration || !daysInWeek || !admissionFees || !discount) {
            return res.status(200).send({
                success: false,
                message: "please fill all the fields"
            })
        }
        const offer = await priceModel({ title, price, classDuration, daysInWeek, admissionFees, discount }).save()
        return res.status(201).send({
            success: true,
            message: "Offer Add Successfully",
            offer
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in adding Price",
            error
        })
    }
}

const allOffers = async (req, res) => {
    try {
        const offers = await priceModel.find();
        return res.status(200).send({
            success: true,
            message: "Successfully get all Offers",
            offers
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in getting all offers",
            error
        })
    }
}

const singleOffer = async (req, res) => {
    try {
        const { id } = req.params;
        const offer = await priceModel.findById({ _id: id });
        return res.status(201).send({
            success: true,
            message: "Get Offer Successfully",
            offer
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Error in getting single offer",
            error
        })
    }
}


const updateOffer = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, price, classDuration, daysInWeek, admissionFees, discount } = req.body;
        if (!title || !price || !classDuration || !daysInWeek || !admissionFees || !discount) {
            return res.status(200).send({
                success: false,
                message: "please fill all the fields"
            })
        }
        const offer = await priceModel.findByIdAndUpdate({ _id: id }, { title, price, classDuration, daysInWeek, admissionFees, discount }, { new: true })
        return res.status(201).send({
            success: true,
            message: "Successfully Updated",
            offer
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in updating offer",
            error
        })
    }
}

const deleteOffer = async (req, res) => {
    try {
        const { id } = req.params
        const offer = await priceModel.findByIdAndDelete({ _id: id });
        return res.status(201).send({
            success: true,
            message: "Successfully Deleted",
            offer
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in deleting the offer",
            error
        })
    }
}

module.exports = {
    addOffer,
    allOffers,
    singleOffer,
    deleteOffer,
    updateOffer
}