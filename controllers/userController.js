const mongoose = require("mongoose");
const userModel = require("../models/userModel");
const { hashPass, comparePass } = require("../helpers/authHelpers");
const JWT = require("jsonwebtoken");
const nodemailer = require("nodemailer");


// ========= SignUp Controller ===========
const signUpController = async (req, res) => {
    try {
        const { name, email, contactNo, password, sports } = req.body;
        if (!name) {
            return res.status(201).send({
                success: false,
                message: "Name is required"
            })
        }
        if (!email) {
            return res.status(201).send({
                success: false,
                message: "Email is required"
            })
        }
        if (!password) {
            return res.status(201).send({
                success: false,
                message: "Password is required"
            })
        }
        if (!contactNo) {
            return res.status(201).send({
                success: false,
                message: "Phone number is required"
            })
        }
        if (!sports) {
            return res.status(201).send({
                success: false,
                message: "sports is required"
            })
        }
        const CheckUser = await userModel.findOne({ email });
        if (CheckUser) {
            return res.status(201).send({
                success: false,
                message: "User Already Exist",
            })
        }
        const checkContact = await userModel.findOne({ contactNo });
        if (checkContact) {
            return res.status(201).send({
                success: false,
                message: "Phone number already exist"
            })
        }


        const hashedPassword = await hashPass(password);
        const user = await userModel({ name, email, contactNo, password: hashedPassword, sports }).save();
        user.password = undefined
        return res.status(202).send({
            success: true,
            message: "user Register Successfully",
            user
        })

    } catch (error) {
        console.log(error),
            res.status(500).send({
                success: false,
                message: "Error in SignIn API",
                error
            })
    }
}


//=========== SignIn Controller ================
const signInController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(201).send({
                success: false,
                message: "Email and Password is Required"
            })
        }
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(201).send({
                success: false,
                message: "Invalid Email and Password"
            });
        }
        const comparePassword = await comparePass(password, user.password);
        if (!comparePassword) {
            return res.status(201).send({
                success: false,
                message: "invalid email and password"
            })
        }

        const token = JWT.sign({ _id: user._id, role: user.role, email: user.email }, process.env.JWT_SECRET);
        user.password = undefined
        return res.status(200).send({
            success: true,
            message: 'Login Successfully',
            user,
            token
        })


    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in SignIn API",
            error
        })
    }
}


//  =========== forget Password ==========
const ForgetPasswordController = async (req, res) => {
    try {
        const { email, sports } = req.body;
        if (!email) {
            return res.status(400).send({
                success: false,
                message: "Email is required"
            })
        }
        if (!sports) {
            return res.status(400).send({
                success: false,
                message: "sports is required"
            })
        }
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(200).send({
                success: true,
                message: "Password send successfully to your email"
            })
        }
        if (sports === user.sports) {

            password = Math.random().toString(36).slice(2);
            hashedPassword = await hashPass(password);
            await userModel.findOneAndUpdate({ email }, { password: hashedPassword }, { new: true });

            const login = "http://localhost:3000/login"

            var transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASSWORD
                }
            })
            var mailOption = {
                from: process.env.EMAIL,
                to: user.email,
                subject: "Password by Al Buhran Online Quran Academy",
                html: `<p><b>Your Login Detail from Al Buhran Online Quran Academy</b><br><b>Email: </b>${user.email}<br><b>Password: </b>${password}<br><a href=${login}>Click here to LOGIN</a></p>`
            };
            transporter.sendMail(mailOption, function (err, info) {
                if (err) {
                    console.log("Error is " + err)
                } else {
                    console.log(`Email send: ${info.response}`);
                }
            })
            return res.status(200).send({
                success: true,
                message: "Password send successfully to your email "
            })
        } else {
            return res.status(200).send({
                success: true,
                message: "Password send successfully to your email "
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Forget password API",
            error
        })
    }
}


//  ================== Change Password =====================
const changePasswordController = async (req, res) => {
    try {
        const email = res.locals.email;
        const { password, newPassword, conformNewPassword } = req.body;
        console.log(email)
        console.log(password, newPassword, conformNewPassword)
        if (!password || !newPassword || !conformNewPassword) {
            return res.status(201).send({
                success: false,
                message: "Fill all the Fields"
            })
        }
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(201).send({
                success: false,
                message: "Invalid email and password"
            })
        }
        const comparePassword = await comparePass(password, user.password);
        if (!comparePassword) {
            return res.status(201).send({
                success: false,
                message: "invalid email and password"
            })
        }
        if (newPassword !== conformNewPassword) {
            return res.status(201).send({
                success: false,
                message: "password did not match"
            })
        }
        const hashedPassword = await hashPass(newPassword);
        await userModel.findOneAndUpdate({ email }, { password: hashedPassword }, { new: true });
        return res.status(200).send({
            success: true,
            message: "Password Updated successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in changePassword API",
            error
        })
    }
}


//  =============== get users ===============
const getUserController = async (req, res) => {
    try {
        const users = await userModel.find();
        return res.status(200).send({
            success: true,
            message: "Data get successfully",
            users
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in get user API",
            error
        })
    }
}


module.exports = {
    signUpController,
    signInController,
    ForgetPasswordController,
    changePasswordController,
    getUserController,
};
