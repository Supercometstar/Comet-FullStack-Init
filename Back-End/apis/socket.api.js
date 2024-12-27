const WebSocketServer = require('ws').Server

const { log } = require('@utils')

module.exports = {
	listen: (port) => {
		
		const wss = new WebSocketServer({ port })
		wss.on('connection', (ws) => {
			ws.on('open', () => {
				log('1 websocket connected!')
			})

			ws.on('close', () => {
				log('1 websocket disconnected!')
			})

			ws.on('message', (message) => {
				log(message)
			})
		})

		log(`SocketAPI running in ${port}`)

	}
}