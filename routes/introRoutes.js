const express = require("express");
const { upload } = require("../server");
const { addIntroController, getIntroController, deleteIntroController, singleIntroCOntroller, updateIntroController } = require("../controllers/introController");

router = express.Router();


router.post("/add-intro", upload.single("file"), addIntroController);
router.get("/get-intro", getIntroController);
router.delete("/delete-intro/:id", deleteIntroController);
router.get("/single-intro/:id", singleIntroCOntroller);
router.put("/update-intro/:id", upload.single("file"), updateIntroController)


module.exports = router;