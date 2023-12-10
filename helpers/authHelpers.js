const bcrypt = require("bcrypt");

// Hashed Password 
const hashPass = async (password) => {
    try {
        const salt = 10;
        const hashPass = await bcrypt.hash(password, salt);
        return hashPass;
    } catch (error) {
        console.log(error);
    }
}

// Password Compar 
const comparePass = async (password, hashedPassword) => {
    try {
        return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
        console.log(`Error in comparing password: ${error}`)
    }
}
module.exports = { hashPass, comparePass }