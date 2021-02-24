const jwt = require('jsonwebtoken')
require('dotenv').config()

function loginToken(input) {
    const token = jwt.sign(input, process.env.SECRET_KEY)
    return token    
}

function verifyToken(token) {
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    return decoded
}

module.exports = {
    loginToken,
    verifyToken
} 