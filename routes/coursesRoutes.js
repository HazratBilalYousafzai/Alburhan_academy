const express = require("express");
const { upload } = require("../server");
const { addCourseController, getCoursesController, singleCourseController, deleteCourseController, updateCourseController } = require("../controllers/coursesController");

router = express.Router();


router.post("/add-course", upload.single("file"), addCourseController);
router.get("/get-courses", getCoursesController);
router.get("/single-course/:id", singleCourseController);
router.put("/update-course/:id", upload.single("file"), updateCourseController)
router.delete("/delete-course/:id", deleteCourseController);


module.exports = router;