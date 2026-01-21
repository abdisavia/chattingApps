import { models } from "../model/index.js";
import { formatError } from "../validators/ErrorFormat.js";
import { getJoinDataByRoomID } from "../services/join/get.service.js";

const getJoinByUserId = (userId) => {
    try{
         
    }catch(e){
        console.log(e);
    }
}

const getAllUsersInRoom = async (req, res) => {
    try{
        const { roomId } = req.params;
        const usersInRoom = await getJoinDataByRoomID(roomId);

        return res.status(200).json({
            status: 200,
            data: usersInRoom
        });
    }catch(e){
        console.log(e.message);
        const formatError = formatError(e.message);
        return res.status(formatError.status).json(formatError);
    }
}

export {
    getAllUsersInRoom
}

