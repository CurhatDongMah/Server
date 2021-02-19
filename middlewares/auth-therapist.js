const { verifyToken } = require("../helpers/jwt")
const { Therapist } = require('../models/index')

async function authenticationTherapist(req, res, next) {
    try {
        const access_token = req.headers.access_token
        if(!access_token){
            throw { name: 'Authentication Failed', msg: 'Please log in first', status: 401 }
        }else{
            const decoded = verifyToken(access_token)
            const therapist = await Therapist.findOne({
                where: {
                    email: decoded.email
                }
            })
            if (!therapist){
                throw { name: 'Authentication Failed', msg:'Wrong Email/Password', status: 401 }
            }else{
                req.loggedInTherapist = decoded
                console.log('berhasil');
                next()
            }
        }
    } catch (err) {
        next(err)
    }
}

module.exports = authenticationTherapist