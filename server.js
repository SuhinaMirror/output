console.log('Serverino started');

const express = require('express');
const xssFilters = require('xss-filters');
const app = express()
		.use(express.static('public'))
		.get('/', (req, res) => {
			res.sendFile(__dirname + '/index.html' )
		})
		.get('/demo.html', (req, res) => {
			res.sendFile(__dirname + '/demo.html' )
		})
		.listen(process.env.PORT | 3000, () => console.log('Running on ' + port));
const port = process.env.PORT || 3000;

const WebSocket = require('ws');
const WebSocketServer = WebSocket.Server;
const wss = new WebSocketServer({server: app});
const serverSocket = new WebSocket('ws://192.168.10.40:8080');

let clients = [];
wss.on('connection', (ws) => {
		console.log('client added');
		clients.push(ws);
		ws.on('close', (code, message) => {
			console.log('client closed');
			let idx = clients.indexOf(ws);
			if (idx >= 0)
				clients.splice(idx, 1);
		});
		ws.on('message', (data, flags) => {
			clients.forEach(client => client.send(data, flags));
		});
});

serverSocket.on('open', () => {
	console.log('Socket on');
	serverSocket.on('message', (data, flags) => {
		console.log('Joonas lähetti viestin.');
		clients.forEach(kikkeli => kikkeli.send(data, flags));
		console.log('Messages sent');
	});
});
