const express = require("express");
const { signUpController,
    signInController,
    ForgetPasswordController,
    changePasswordController,
    getUserController, } = require("../controllers/userController");
const { authenticateUser, requireSignIn } = require("../middlewares/authentication");


// Router Object 
const router = express.Router();

router.post("/signUp", requireSignIn, signUpController)

router.post("/signIn", signInController)

// protected rout user  auth 
router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).send({ ok: true })
})

router.post("/forget-password", ForgetPasswordController)

router.patch("/change-password", requireSignIn, changePasswordController)
router.get("/get-users", requireSignIn, getUserController)

module.exports = router;