export const joinRoomHandler =  (io, socket) => {
    socket.on("join-room", (roomId) => {
        const id = Number(roomId);
        if (!socket.allowedRooms?.has(id)) return;
        socket.join(`room:${id}`)
        console.log(`User ${socket.userName} joined room:${id}`);
        io.to(`room:${id}`).emit(`new-message`, {
            userId: "system",
            message: `${socket.userName} has joined the room.`
        });
    })
}