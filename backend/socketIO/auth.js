import { verifyToken } from "../utils/token/verifyToken.js";
import { getJoinDataByUserID } from "../services/join/get.service.js";


export const socketAuth = async (socket,next) => {
    const token = socket.handshake.auth.token;
    if (!token) return next(new Error("Unauthorize"));

    const user = verifyToken(token);
    socket.userId = user.id;
    socket.userName = user.name;

    const rooms = await getJoinDataByUserID(user.id);

    socket.allowedRooms = new Set(
        rooms.map((val) => val.roomId)
    );

    return next();
}