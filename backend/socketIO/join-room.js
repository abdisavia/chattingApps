export const joinRoomHandler =  (io, socket) => {
    socket.on("join-room", (roomId) => {
        const id = Number(roomId);
        if (!socket.allowedRooms?.has(id)) return;
        socket.join(`room:${id}`)
    })
}