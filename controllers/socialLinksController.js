const mongoose = require("mongoose");
const SocialMediaModel = require("../models/socialLinksModel")


const addSocialLinksController = async (req, res) => {
    try {
        const { facebook, youtube, whatsapp } = req.body;
        if (!facebook || !youtube || !whatsapp) {
            return res.status(200).send({
                success: false,
                message: "please fill all the fields"
            })
        }
        const socialLinks = await SocialMediaModel({ facebook, youtube, whatsapp }).save()
        return res.status(201).send({
            success: true,
            message: "Successfully Added",
            socialLinks
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in adding Social links",
            error
        })
    }
}



const socialLinksController = async (req, res) => {
    try {
        const socialLinks = await SocialMediaModel.find();
        return res.status(200).send({
            success: true,
            message: "Successfully get all social links",
            socialLinks
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in getting social links API",
            error
        })
    }
}



const updateSocialLinksController = async (req, res) => {
    try {
        const { id } = req.params;
        const { facebook, youtube, whatsapp } = req.body;
        if (!facebook || !youtube || !whatsapp) {
            return res.status(200).send({
                success: false,
                message: "please fill all the fields"
            })
        }
        const socialLinks = await SocialMediaModel.findByIdAndUpdate({ _id: id }, { facebook, youtube, whatsapp }, { new: true })
        return res.status(201).send({
            success: true,
            message: "Successfully Updated",
            socialLinks
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in updating Social Links",
            error
        })
    }
}



const deleteSocialLinksController = async (req, res) => {
    try {
        const { id } = req.params
        const socialLinks = await SocialMediaModel.findByIdAndDelete({ _id: id });
        return res.status(201).send({
            success: true,
            message: "Successfully Deleted",
            socialLinks
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in deleting",
            error
        })
    }
}


module.exports = { addSocialLinksController, socialLinksController, deleteSocialLinksController, updateSocialLinksController }
