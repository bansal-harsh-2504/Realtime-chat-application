import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

let allSockets: WebSocket[] = [];

wss.on("connection", (socket: WebSocket) => {
  allSockets.push(socket);

  console.log("User connected #");

  socket.on("message", (message) => {
    console.log("message received" + message.toString());

    allSockets.forEach((s) => {
      s.send(message.toString() + ": sent from the server");
    });
  });

  socket.on("close", () => {
    allSockets = allSockets.filter((s) => s != socket);
    console.log("User disconnected #");
  });
});
