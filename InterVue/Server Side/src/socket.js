import { Server } from "socket.io";

const setupSocket = (httpServer) => {

    const io = new Server(httpServer, { cors: { origin: "http://localhost:5173" } });
    io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("join-room", (roomId) => {
      socket.join(roomId);
      socket.to(roomId).emit("user-joined", socket.id);
    });

    socket.on("offer", (data) => {
      socket.to(data.roomId).emit("offer", data.sdp);
    });

    socket.on("answer", (data) => {
      socket.to(data.roomId).emit("answer", data.sdp);
    });

    socket.on("ice-candidate", (data) => {
      socket.to(data.roomId).emit("ice-candidate", data.candidate);
    });
  });
};

export {setupSocket};