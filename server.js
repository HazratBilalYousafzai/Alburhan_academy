const express = require("express");
const morgan = require('morgan');
const cors = require("cors");
const colors = require("colors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const multer = require("multer");
const path = require("path")




// dotenv configuration 
dotenv.config();

// Rest obj 
const app = express();

// Mongo connection 
connectDB();

// middleware 
app.use(express.json())
app.use(cors());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "./client/build")))


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./client/src/Assets/images")
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now()
        cb(null, uniqueSuffix + file.originalname);
    }
})
const upload = multer({ storage: storage })
module.exports = { upload };

// Routes 
app.use("/api/v1/auth", require("./routes/userRoutes"))
app.use("/api/v1/message", require("./routes/contactRoutes"))
app.use("/api/v1/price", require("./routes/priceRoutes"))
app.use("/api/v1/intro", require("./routes/introRoutes"))
app.use("/api/v1/courses", require("./routes/coursesRoutes"))
app.use("/api/v1/carousel", require("./routes/carouselRoutes"))
app.use("/api/v1/social-links", require("./routes/socialLinksRoutes"))


app.use("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./client/build/index.html"))
})

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => { console.log(`we are listening to PORT ${PORT}`.bgGreen.white) })