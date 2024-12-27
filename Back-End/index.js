require('module-alias/register')

const dotenv = require('dotenv')

const { MainAPI, SocketAPI,	DataAPI } = require('@apis')

dotenv.config({ path: '.env' })

const serviceStart = async () => {
	MainAPI.listen(process.env.MAIN_PORT)
	SocketAPI.listen(process.env.SOCKET_PORT)
	DataAPI.listen(process.env.DATA_URI)
}

serviceStart()