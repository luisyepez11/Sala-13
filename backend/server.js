import app from "./src/app.js";
import { PORT } from "./src/config.js";
import { Server } from "socket.io";
import http from "http";

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173"
  }
});

server.listen(PORT, () => {
  console.log(`Servidor puerto http://localhost:${PORT}`);
});

io.on("connection", socket => {
  socket.on("mensaje", (data) => {
    socket.join(data.sala);
    console.log(data);
    socket.to(data.sala).emit("mensaje", {mensaje:data.comment,mensaje:data.comment,idCuenta:data.idCuenta,userName:data.userName});
  });
});