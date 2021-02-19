const { verifyToken } = require("../helpers/jwt")
const { Client } = require('../models/index')

async function authenticationClient(req, res, next) {
    try {
        const access_token = req.headers.access_token
        if(!access_token){
            throw { name: 'Authentication Failed', msg: 'Please log in first', status: 401 }
        }else{
            const decoded = verifyToken(access_token)
            const client = await Client.findOne({
                where: {
                    email: decoded.email
                }
            })
            if (!client){
                throw { name: 'Authentication Failed', msg:'Wrong Email/Password', status: 401 }
            }else{
                req.loggedInClient = decoded
                console.log('berhasil');
                next()
            }
        }
    } catch (err) {
        next(err)
    }
}

module.exports = authenticationClient