const { verifyToken } = require("../helpers/jwt")
const { Therapist } = require('../models/index')

async function authenticationTherapist(req, res, next) {
    try {
        const decoded = verifyToken(req.headers.access_token)
        // console.log(decoded)
        const therapist = await Therapist.findOne({
            where: {
                email: decoded.email
            }
        })
        if (!therapist){
            throw { name: 'Invalid Email / Password' }
        }else{
            req.loggedInTherapist = decoded
            next()
        }
        
    } catch (err) {
        next(err)
    }
}

function authorizeTherapist (req, res, next) {
    Therapist.findOne({
        where: { id: +req.params.id }
    })
        .then(data => {
            if (data.id !== req.loggedInTherapist.id) {
                next({ name: 'Unauthorized' })
            } else {
                next()
            }
        })
        .catch(err => {
            next(err)
        })
}

module.exports = { 
    authenticationTherapist,
    authorizeTherapist
}