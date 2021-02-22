const express = require('express')
const cors = require('cors')
const env = process.env.NODE_ENV || 'development'
const routes = require('./routes')
const { errorHandler } = require('./middlewares/error_handler')
const port = process.env.PORT || 3000

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', routes)
app.use(errorHandler)

if (env === 'development') {
    app.listen(port, function() {
        console.log(`app running on ${port}`)
    })
}

module.exports = app
