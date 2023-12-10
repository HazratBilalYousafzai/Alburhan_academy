const express = require('express');
const { addMessage, allMessages, singleMessage, deleteMessage, readMessageController } = require('../controllers/contactController');
const { authenticateUser, requireSignIn, } = require('../middlewares/authentication');



const router = express.Router();

router.post("/add-message", addMessage);
router.get("/all-messages", requireSignIn, allMessages);
router.get("/single-message/:id", requireSignIn, singleMessage);
router.delete("/delete-message/:id", requireSignIn, deleteMessage);
router.patch("/read-message/:id", requireSignIn, readMessageController);

module.exports = router;