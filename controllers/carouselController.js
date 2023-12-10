const mongoose = require("mongoose");
const CarouselModel = require("../models/carouselModel");
const fs = require("fs")
const path = require("path");
const { Console } = require("console");
const CourseModel = require("../models/coursesModel");


const addCarouselController = async (req, res) => {
    try {
        const { author, sayings } = req.body
        const image = req.file?.filename

        if (!author || !sayings) {
            fs.unlink(path.join(__dirname, `../client/src/Assets/images/${image}`), function (err) {
                if (err) {
                    console.log("Error occurred")
                } else {
                    console.log("Successfully deleted")
                }
            })
            return res.status(201).send({
                success: false,
                message: "Please fill all the Fields"
            })
        }
        if (!image) {
            return res.status(201).send({
                success: false,
                message: "Image is required"
            })
        }
        const carousel = await CarouselModel({ author, sayings, image }).save()
        return res.status(200).send({
            success: true,
            message: "Carousel Added",
            carousel
        })
    } catch (error) {
        console.log(error);
        res.status(201).send({
            success: false,
            message: "Error in Add Carousel API",
            error
        })
    }
}


const getCarouselController = async (req, res) => {
    try {
        const carousel = await CarouselModel.find();
        return res.status(200).send({
            success: true,
            message: "successfully get",
            carousel
        })
    } catch (error) {
        return res.status(201).send({
            success: false,
            message: "Error in getting Carousels"
        })
    }
}


const singleCarouselController = async (req, res) => {
    try {
        const { id } = req.params
        const carousel = await CarouselModel.findById({ _id: id });
        res.status(200).send({
            success: true,
            message: "Data get Successfully",
            carousel
        })
    } catch (error) {
        console.log(error);
        res.status(201).send({
            success: false,
            message: "Error in getting single data"
        })
    }
}



const updateCarouselController = async (req, res) => {
    try {
        const { id } = req.params;
        const { author, sayings } = req.body;
        const image = req.file?.filename;
        if (!author || !sayings) {
            fs.unlink(path.join(__dirname, `../client/src/Assets/images/${image}`), function (err) {
                if (err) {
                    console.log("Error occurred")
                } else {
                    console.log("Successfully deleted")
                }
            })
            return res.status(201).send({
                success: false,
                message: "Please Fill all the Fields"
            })
        }
        if (image) {
            const carousel = await CarouselModel.findByIdAndUpdate({ _id: id }, { author, sayings, image })
            fs.unlink(path.join(__dirname, `../client/src/Assets/images/${carousel.image}`), function (err) {
                if (err) {
                    console.log("Error occurred")
                } else {
                    console.log("Successfully deleted")
                }
            })
            return res.status(200).send({
                success: true,
                message: "Successfully Updated",
                carousel
            })
        } else {
            const carousel = await CarouselModel.findByIdAndUpdate({ _id: id }, { author, sayings }, { new: true })
            return res.status(200).send({
                success: true,
                message: "Successfully Updated",
                carousel
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(201).send({
            success: false,
            message: "Error in update API"
        })
    }
}




const deleteCarouselController = async (req, res) => {
    try {
        const { id } = req.params
        const carousel = await CarouselModel.findByIdAndDelete({ _id: id });
        fs.unlink(path.join(__dirname, `../client/src/Assets/images/${carousel.image}`), function (err) {
            if (err) {
                console.log("Error occurred")
            } else {
                console.log("Successfully deleted")
            }
        })
        res.status(200).send({
            success: true,
            message: "Successfully Deleted",
            carousel
        })
    } catch (error) {
        console.log(error);
        return res.status(201).send({
            success: false,
            message: "Error in deleting carousel API"
        })
    }
}

module.exports = { addCarouselController, getCarouselController, deleteCarouselController, singleCarouselController, updateCarouselController }

