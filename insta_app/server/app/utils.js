const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = async (token) => {

    try {
        let decoded = await jwt.verify(token, process.env.SECRET_KEY)
        return(decoded.email);
    }
    catch (ex) {
        return(false);
    }
}

module.exports = {verifyToken}