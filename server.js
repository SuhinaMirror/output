const express = require('express');
const xssFilters = require('xss-filters');
const app = express()
		.get('/', (req, res) => {
			res.sendFile(__dirname + '/index.html' )
		})
		.listen(process.env.PORT | 3000, () => console.log('Running on ' + port));
const port = process.env.PORT || 3000;
const WebSocketServer = require('ws').Server
const wss = new WebSocketServer({server: app});

wss.on('connection', (ws) => {
	ws.on('message', (data, flags) => {
		console.log("message received");
		ws.send(data, flags)
	});
});
