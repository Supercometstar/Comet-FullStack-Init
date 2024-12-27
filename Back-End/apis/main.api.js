const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const hpp = require('hpp')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')

const routes = require('@routes')

const { corsOptions, log, errorHandler } = require('@utils')

module.exports = {
	listen: (port) => {

		const mainAPI = express()

		mainAPI.use(helmet())
		mainAPI.use(hpp())
		mainAPI.use(bodyParser.json())
		mainAPI.use(bodyParser.urlencoded({ extended: true }))
		mainAPI.use(cookieParser())
		mainAPI.use(cors(corsOptions))
		mainAPI.use(morgan('dev'))

		mainAPI.use('/api', routes)

		mainAPI.use(errorHandler)

		mainAPI.listen(port, () => {
			log(`MainAPI running in ${port}!`)
		})

	}
}