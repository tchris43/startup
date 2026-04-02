const { WebSocketServer, WebSocket } = require('ws');

function peerProxy(httpServer){
    const socketServer = new WebSocketServer({server: httpServer});
}