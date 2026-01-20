export const joinRoomHandler =  (io, socket) => {
    socket.on("join-room", (roomId, next) => {
        const id = Number(roomId);
        if (!socket.allowedRooms?.has(id)) return next(new Error("Akses ditolak"));
        socket.join(`room:${id}`)
    })
}