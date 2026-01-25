import { models } from "../../model/index.js";
import { Op } from "sequelize";

const getRoomByID= async (roomId) => {
    if (!roomId) throw new Error("ValidationError: Room ID tidak boleh kosong");
    const room =  await models.Rooms.findByPk(roomId);
    return room;
}

export {
    getRoomByID,
}

