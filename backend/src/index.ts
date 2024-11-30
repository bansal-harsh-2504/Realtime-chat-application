import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (socket) => {
  console.log("User connected");

  setInterval(() => {
    socket.send("Current price of shib: " + Math.random());
  }, 1000);

  socket.on("close", () => {
    console.log("User disconnected");
  });

  socket.on("message", (e) => {
    console.log(e.toString());
    if (e.toString() === "ping") {
      socket.send("pong");
    }
  });
});
