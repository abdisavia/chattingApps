import { models } from "../../model/index.js";
import { Op } from "sequelize";

const getRoomByID= async (roomId) => {
    if (!roomId) throw new Error("ValidationError: Room ID tidak boleh kosong");
    return await models.Rooms.findByPk(roomId);
}

const getRoomsByUserId = async (userId) => {
    if (!userId) throw new Error("ValidationError: User id tidak boleh kosong");
    const joinedRooms = await models.Join.findAll({
        attributes:["roomId"],
        where: {
            userId: userId
        },
        limit:10
    })

    const rooms = [];
    for(let i = 0; i < joinedRooms.length; i++){
        const room = await models.Rooms.findByPk(joinedRooms[i].dataValues.roomId);
        rooms.push(room);
    }
    
    return rooms;
}

export {
    getRoomByID,
    getRoomsByUserId
}

