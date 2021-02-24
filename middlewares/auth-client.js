const { verifyToken } = require("../helpers/jwt")
const { Client } = require('../models/index')

async function authenticationClient(req, res, next) {
    try {
        const access_token = req.headers.access_token
        if(!access_token){
            throw { name: 'Authentication Failed' }
        }else{
            const decoded = verifyToken(access_token)
            const client = await Client.findOne({
                where: {
                    email: decoded.email
                }
            })
            if (!client){
                throw { name: 'Invalid Email / Password' }
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

function authorizeClient (req, res, next) {
    Client.findOne({
        where: { id: +req.params.id }
    })
        .then(data => {
            if (data.id !== req.loggedInClient.id) {
                next({ name: 'Unauthorized' })
            } else {
                next()
            }
        })
        .catch(err => {
            next(err)
        })
}

module.exports = { authenticationClient, authorizeClient }