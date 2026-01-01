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


const userRooms = new Map();

io.on("connection", socket => {
  console.log(`Usuario conectado: ${socket.userName}`);

  socket.on("joinRoom", (roomId) => {

    const previousRoom = userRooms.get(socket.id);
    if (previousRoom) {
      socket.leave(previousRoom);
      console.log(`Usuario ${socket.id} salió de la sala ${previousRoom}`);
    }

    socket.join(roomId);
    userRooms.set(socket.id, roomId);
    console.log(`Usuario ${socket.userName} se unió a la sala ${roomId}`);
  });

  socket.on("mensaje", (data) => {
    console.log("Mensaje recibido:", data);
    
    const userRoom = userRooms.get(socket.id);
    if (userRoom && userRoom === data.sala) {
      io.to(data.sala).emit("mensaje", {
        mensaje: data.comment,
        idCuenta: data.idCuenta,
        userName: data.userName,
        sala: data.sala,
        timestamp: new Date().toISOString()
      });
    } else {
      console.log(`Usuario ${socket.userName} intentó enviar mensaje a sala ${data.sala} pero está en sala ${userRoom}`);
    }
  });
  socket.on("disconnect", () => {
    const roomId = userRooms.get(socket.id);
    if (roomId) {
      socket.leave(roomId);
      userRooms.delete(socket.id);
      console.log(`Usuario ${socket.id} desconectado de la sala ${roomId}`);
    }
    console.log(`Usuario desconectado: ${socket.id}`);
  });
});