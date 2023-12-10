const express = require("express");
const { addSocialLinksController, socialLinksController, deleteSocialLinksController, updateSocialLinksController } = require("../controllers/socialLinksController");



const router = express.Router();

router.post("/add-social-links", addSocialLinksController)
router.get("/all-social-links", socialLinksController)
router.delete("/delete-social-links/:id", deleteSocialLinksController)
router.put("/update-social-links/:id", updateSocialLinksController)


module.exports = router;