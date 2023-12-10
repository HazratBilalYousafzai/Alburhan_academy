const multer = require("multer");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "../client/src/Assets/images")
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now()
        cb(null, uniqueSuffix + file.originalname);
    }
})

var upload = multer({ storage: storage }).single("file")


module.exports = { upload };