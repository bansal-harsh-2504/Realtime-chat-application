import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

interface User {
  socket: WebSocket;
  room: string;
}

let allSockets: User[] = [];

wss.on("connection", (socket: WebSocket) => {
  console.log("User connected #");

  socket.on("message", (message) => {
    const parsedMessage = JSON.parse(message as unknown as string);
    if (parsedMessage.type === "join") {
      allSockets.push({
        socket,
        room: parsedMessage.payload.roomId,
      });
    }

    if (parsedMessage.type === "chat") {
      const currUserRoom = allSockets.find((user) => user.socket === socket);

      if (currUserRoom) {
        for (let i = 0; i < allSockets.length; i++) {
          if (allSockets[i].room === currUserRoom.room) {
            allSockets[i].socket.send(parsedMessage.payload.message);
          }
        }
      }
    }
  });

  socket.on("close", () => {
    allSockets = allSockets.filter((obj) => obj.socket != socket);
    console.log("User disconnected #");
  });
});
