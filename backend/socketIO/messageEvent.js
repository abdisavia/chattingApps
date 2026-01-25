export const messageEventHandler = (io, socket) => {
    socket.on("send-message", async (payload) => {
        const { roomId, message } = payload;
        if (!socket.allowedRooms.has(roomId)) return;
        const date = new Date().toISOString();
        if(!date) return;

        socket.to(`room:${roomId}`).emit("new-message", {
            sender_id: socket.user.id,
            type:"text",
            message: message,
            attachment:[],
            created_at: date
        })
    })
}