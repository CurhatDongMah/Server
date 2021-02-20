function errorHandler(err, req, res, next) {
    if (err) {
        // console.log('ini dari handler')
        // console.log(err)
        // console.log('ini akhir dari hanlder')
            switch (err.name) {
                case 'SequelizeValidationError':
                    // console.log(err.errors)
                    let errMes = err.errors.map(el => {
                        // console.log(el.message, 'ini message dri valid')
                        return el.message
                    })
                    res.status(400).json({message: errMes})
                    break
                case 'SequelizeUniqueConstraintError':
                    // console.log(err.errors)
                    let errMes2 = err.errors.map(el => {
                        // console.log(el.message, 'ini message dri valid')
                        return el.message
                    })
                    res.status(400).json({message: errMes2})
                    break
                case 'Internal Server Error': 
                    res.status(500).json({message: 'Internal Server Error'})
                    break
                case 'Data Not Found': 
                    res.status(404).json({message: 'Data Not Found'})
                    break
                case 'Unauthorized':
                    res.status(401).json({message: 'Unauthorized'})
                    break
                case 'Invalid Email / Password': 
                    res.status(400).json({message: 'Invalid Email / Password'})
                    break
                case 'JsonWebTokenError':
                    res.status(401).json({ message: 'You need to login first'})
                    break;
                case 'Authentication Failed':
                    res.status(401).json({ message: 'You need to login first'})
                default: 
                    res.status(500).json({message: 'Internal Server Error'})
                    break
            }
    }
}

module.exports = { errorHandler }