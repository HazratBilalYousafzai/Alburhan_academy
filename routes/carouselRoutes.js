const express = require("express");
const { upload } = require("../server");
const { addCarouselController, getCarouselController, deleteCarouselController, singleCarouselController, updateCarouselController } = require("../controllers/carouselController");

router = express.Router();


router.post("/add-carousel", upload.single("file"), addCarouselController);
router.get("/get-carousels", getCarouselController);
router.get("/single-carousel/:id", singleCarouselController);
router.put("/update-carousel/:id", upload.single("file"), updateCarouselController);
router.delete("/delete-carousel/:id", deleteCarouselController);


module.exports = router;