const express = require("express");
const { addOffer, allOffers, singleOffer, deleteOffer, updateOffer } = require("../controllers/priceController");
const { requireSignIn } = require("../middlewares/authentication");

const router = express.Router();

router.post("/add-offer", requireSignIn, addOffer)
router.get("/all-offers", allOffers)
router.get("/single-offer/:id", requireSignIn, singleOffer)
router.delete("/delete-offer/:id", requireSignIn, deleteOffer)
router.put("/update-offer/:id", requireSignIn, updateOffer)


module.exports = router;