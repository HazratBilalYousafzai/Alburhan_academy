
const { response } = require("express");
const JWT = require("jsonwebtoken");


const authenticateUser = async (req, res, next) => {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1];
    console.log(token)

    if (token == null) {
        return res.sendStatus(401);
    }

    JWT.verify(token, process.env.JWT_SECRET, (err, response) => {
        if (err) {
            return res.sendStatus(403)
        } else {
            res.locals = response;
            next()
        }
    })
}

// signIn middleware || protected   
const requireSignIn = async (req, res, next) => {
    try {

        const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET, (err, response) => {
            if (err) {
                return res.sendStatus(403)
            } else {
                // req.user = response;
                res.locals = response;
                next();
            }
        });


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error
        })
    }
}

const checkRole = async (req, res, next) => {
    try {
        if (res.locals.role == process.env.USER) {
            res.sendStatus(401)
        } else {

            next()
        }

    } catch (error) {
        console.log(error);
        res.sendStatus(403);
    }
}

module.exports = { checkRole, authenticateUser, requireSignIn }