const mongoose = require("mongoose");
const CoursesModel = require("../models/coursesModel");
const fs = require("fs")
const path = require("path")


const addCourseController = async (req, res) => {
    try {
        const { title, description } = req.body
        const image = req.file?.filename

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
        if (!image) {
            return res.status(201).send({
                success: false,
                message: "Image is required"
            })
        }

        const course = await CoursesModel({ title, description, image }).save()
        return res.status(200).send({
            success: true,
            message: "Course Added",
            course
        })
    } catch (error) {
        console.log(error);
        res.status(201).send({
            success: false,
            message: "Error in Add Course API",
            error
        })
    }
}



const getCoursesController = async (req, res) => {
    try {
        const courses = await CoursesModel.find();
        return res.status(200).send({
            success: true,
            message: "successfully get",
            courses
        })
    } catch (error) {
        return res.status(201).send({
            success: false,
            message: "Error in getting Courses"
        })
    }
}


const singleCourseController = async (req, res) => {
    try {
        const { id } = req.params
        const course = await CoursesModel.findById({ _id: id });
        res.status(200).send({
            success: true,
            message: "Data get Successfully",
            course
        })
    } catch (error) {
        console.log(error);
        res.status(201).send({
            success: false,
            message: "Error in getting single data"
        })
    }
}




const updateCourseController = async (req, res) => {
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
            const course = await CoursesModel.findByIdAndUpdate({ _id: id }, { title, description, image })
            fs.unlink(path.join(__dirname, `../client/src/Assets/images/${course.image}`), function (err) {
                if (err) {
                    console.log("Error occurred")
                } else {
                    console.log("Successfully deleted")
                }
            })
            return res.status(200).send({
                success: true,
                message: "Successfully Updated",
                course
            })
        } else {
            const course = await CoursesModel.findByIdAndUpdate({ _id: id }, { title, description }, { new: true })
            return res.status(200).send({
                success: true,
                message: "Successfully Updated",
                course
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




const deleteCourseController = async (req, res) => {
    try {
        const { id } = req.params
        const course = await CoursesModel.findByIdAndDelete({ _id: id });
        fs.unlink(path.join(__dirname, `../client/src/Assets/images/${course.image}`), function (err) {
            if (err) {
                console.log("Error occurred")
            } else {
                console.log("Successfully deleted")
            }
        })
        res.status(200).send({
            success: true,
            message: "Successfully Deleted",
            course
        })
    } catch (error) {
        console.log(error);
        return res.status(201).send({
            success: false,
            message: "Error in deleting course"
        })
    }
}

module.exports = { addCourseController, getCoursesController, singleCourseController, deleteCourseController, updateCourseController }