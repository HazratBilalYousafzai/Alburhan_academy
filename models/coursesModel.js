const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
    title: String,
    description: String,
    image: String
});

const CourseModel = mongoose.model("Course", courseSchema);

module.exports = CourseModel;