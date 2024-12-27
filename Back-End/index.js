require('module-alias/register')

const { MainAPI, SocketAPI,	DataAPI } = require('@apis')

const serviceStart = () => {
	MainAPI.listen()
	SocketAPI.listen()
	DataAPI.listen()
}

serviceStart()