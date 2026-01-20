export const messageEventHandler = (io, socket) => {
    socket.on("send-message", async (payload) => {
        const { roomId, message } = payload;
        if (!socket.allowedRooms.has(roomId)) return;

        io.to(`room:${roomId}`).emit("new-message", {
            userId: socket.user.id,
            message: message
        })
    })
}