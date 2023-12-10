const mongoose = require("mongoose");
const IntroModel = require("../models/introModel");
const fs = require("fs")
const path = require("path")


const addIntroController = async (req, res) => {
    try {
        const { title, description } = req.body
        const image = req.file?.filename
        if (!image) {
            return res.status(201).send({
                success: false,
                message: "Image is required"
            })
        }
        if (!title || !description) {
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

        const intro = await IntroModel({ title, description, image }).save()
        return res.status(200).send({
            success: true,
            message: "Successfully add Intro",
            intro
        })
    } catch (error) {
        console.log(error);
        res.status(201).send({
            success: false,
            message: "Error in Add Intro API",
            error
        })
    }
}

const getIntroController = async (req, res) => {
    try {
        const intro = await IntroModel.find();
        return res.status(200).send({
            success: true,
            message: "successfully get",
            intro
        })
    } catch (error) {
        return res.status(201).send({
            success: false,
            message: "Error in getting Into"
        })
    }
}

const singleIntroCOntroller = async (req, res) => {
    try {
        const { id } = req.params
        const intro = await IntroModel.findById({ _id: id });
        res.status(200).send({
            success: true,
            message: "Data get Successfully",
            intro
        })
    } catch (error) {
        console.log(error);
        res.status(201).send({
            success: false,
            message: "Error in getting single data"
        })
    }
}

const updateIntroController = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        const image = req.file?.filename;
        if (!title || !description) {
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
            const intro = await IntroModel.findByIdAndUpdate({ _id: id }, { title, description, image })
            fs.unlink(path.join(__dirname, `../client/src/Assets/images/${intro.image}`), function (err) {
                if (err) {
                    console.log("Error occurred")
                } else {
                    console.log("Successfully deleted")
                }
            })
            return res.status(200).send({
                success: true,
                message: "Successfully Updated",
                intro
            })
        } else {
            const intro = await IntroModel.findByIdAndUpdate({ _id: id }, { title, description }, { new: true })
            return res.status(200).send({
                success: true,
                message: "Successfully Updated",
                intro
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

const deleteIntroController = async (req, res) => {
    try {
        const { id } = req.params
        const intro = await IntroModel.findByIdAndDelete({ _id: id });
        fs.unlink(path.join(__dirname, `../client/src/Assets/images/${intro.image}`), function (err) {
            if (err) {
                console.log("Error occurred")
            } else {
                console.log("Successfully deleted")
            }
        })
        res.status(200).send({
            success: true,
            message: "Successfully Deleted",
            intro
        })
    } catch (error) {
        console.log(error);
        return res.status(201).send({
            success: false,
            message: "Error in deleting intro"
        })
    }
}
module.exports = { addIntroController, getIntroController, deleteIntroController, singleIntroCOntroller, updateIntroController }