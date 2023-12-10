const mongoose = require("mongoose");
const ContactModel = require("../models/contactModel");


const addMessage = async (req, res) => {
    try {
        const { username, email, subject, message } = req.body;
        if (!username) {
            return res.status(400).send({
                success: false,
                message: "User Name is Required"
            })
        }
        if (!email) {
            return res.status(400).send({
                success: false,
                message: "Email is Required"
            })
        }
        if (!subject) {
            return res.status(400).send({
                success: false,
                message: "Subject is Required"
            })
        }
        if (!message) {
            return res.status(400).send({
                success: false,
                message: "Message is Required"
            })
        }

        const contact = await ContactModel({ username, email, subject, message }).save();
        return res.status(201).send({
            success: true,
            message: "Message Send Successfully",
            contact
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Message Failed"
        })
    }
}

const allMessages = async (req, res) => {
    try {
        const contacts = await ContactModel.find();
        return res.status(201).send({
            success: true,
            message: "Get all the Messages Successfully",
            contacts
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in getting All Messages"
        })
    }
}


const singleMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const contact = await ContactModel.findById({ _id: id });
        return res.status(201).send({
            success: true,
            message: "the Message get Successfully",
            contact
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in getting Message"
        })
    }
}


const readMessageController = async (req, res) => {
    try {
        const { id } = req.params;
        const { read } = req.body;

        const message = await ContactModel.findByIdAndUpdate({ _id: id }, { read }, { new: true })
        return res.status(201).send({
            success: true,
            message: "Successfully Updated",
            message
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in update",
            error
        })
    }
}



const deleteMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const contact = await ContactModel.findByIdAndDelete({ _id: id });
        return res.status(200).send({
            success: true,
            message: "Successfully Deleted",
            contact
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in getting Message"
        })
    }
}

module.exports = {
    addMessage,
    allMessages,
    singleMessage,
    deleteMessage,
    readMessageController
}