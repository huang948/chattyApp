// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  var colors = ["#00ff00", "#0000ff", "#000000", "#ff0000"];
  var color = colors[Math.floor(Math.random()*colors.length)];
  console.log('Client connected');
  var current_connections = wss.clients.size;
  wss.clients.forEach(function each(client) {
    var object = {
      type: "number",
      size: current_connections,
    };
    client.send(JSON.stringify(object));
  })

  ws.on('message', function incoming(data) {
    data = JSON.parse(data);
    console.log(`User ${data.username} said ${data.content}`);
    if (data.type === "postMessage") {
      data.id = uuidv4();
      data.type = "incomingMessage";
      data.color = color;
      wss.clients.forEach(function each(client) {
        client.send(JSON.stringify(data));
      });
    } else if (data.type === "postNotification") {
      data.id = uuidv4();
      data.type = "incomingNotification"
      data.color = color;
      wss.clients.forEach(function each(client) {
        client.send(JSON.stringify(data));
      })
    }
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});