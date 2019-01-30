// https://medium.com/@martin.sikora/node-js-websocket-simple-chat-tutorial-2def3a841b61

const WebSocketServer = require('websocket').server;
const http = require('http');
const log = require('./logger');
const serveFiles = require('./file-server');
const ip = require('ip');

const port = 8080;

const openConnections = [];

// let the file server handle all of the GET requests
const httpServer = http.createServer(serveFiles);

httpServer.listen(port, function() {
    const ipAddress = ip.address();
    log(`access desktop page on http://${ipAddress}:${port}/`);
});

// create the server
const wsServer = new WebSocketServer({ httpServer });

// WebSocket server
wsServer.on('request', function(request) {

    var connection = request.accept(null, request.origin);
    openConnections.push(connection);

    log(`ws: new connection established (${openConnections.length})`);

    // This is the most important callback for us, we'll handle
    // all messages from users here.
    connection.on('message', function(message) {

        // log('ws: new message received');

        if (message.type === 'utf8') {
            // process WebSocket message
            // connection.sendUTF( JSON.stringify({ type: 'history', data: "BLAH blah"}) );

            // broadcast message to all the clients except the one who sent the message
            openConnections.forEach(function(destination) {
                if(destination !== connection) {
                    destination.sendUTF(message.utf8Data);
                }
            });
        }
    });

    connection.on('close', function(connection) {
        // close user connection

        // remove connection from the list
        const ix = openConnections.indexOf(connection);
        openConnections.splice(ix, 1);

        log(`ws: connection closed (${openConnections.length})`);
    });
});