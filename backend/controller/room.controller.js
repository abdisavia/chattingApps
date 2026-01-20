import { sequelize } from "../config/dbconfig.js";
import { createJoin } from "../services/join/create.service.js";
import { createRoom } from "../services/room/create.service.js";
import response from "../utils/response.js";
import { formatError } from "../validators/ErrorFormat.js";
import { getJoinDataByUserID, getJoinDataByUserIDRoomID } from "../services/join/get.service.js";
import { getRoomByID,getRoomsByUserId } from "../services/room/get.service.js";
import { getMessages } from "../services/message/get.service.js";
import { getUserService } from "../services/user/get.service.js";

const getById = async (req, res, next) => {
    try {
        const roomUserData = {
            userId: req.user.id,
            roomId: Number(req.params.id)
        }

        if (!roomUserData.roomId) throw new Error("ValidationError: Room Id is required");
        else if (!roomUserData.userId) throw new Error("ValidationError: user Id is required");

        const userRoom = await getJoinDataByUserIDRoomID(roomUserData);
        if (!userRoom.dataValues) throw new Error("UserAkses: Kamu tidak memiliki akses ke room ini");
        
        const room = await getRoomByID(roomUserData.roomId)
        if (!room) throw new Error("NotFound: Room tidak ditemukan");
        
        const messages = await getMessages(roomUserData.roomId);
        
        return res.status(200).json(response(200, {
            room: room,
            messages: messages
        },null,null))

    } catch (e) {
        const errorFormat = formatError(e.message);
        return res.status(errorFormat.status).json(errorFormat);
    }
}

const getAllRooms = async (req, res, next) => {
    try {
        const userId = req.user.id;
        if (!userId) throw new Error("ValidationError: user id tidak boleh kosong");
        
        
        const joinedRooms = await getRoomsByUserId(userId);

        if (joinedRooms.length < 1) return res.status(200).json(response(200, null, "Kamu belum buat/masuk ke dalam room manapun"));
        return res.status(200).json(response(200, joinedRooms, "room berhasil diambil", null));
        
    } catch (e) {
        const errorFormat = formatError(e.message);
        return res.status(errorFormat.status).json(errorFormat);
    }
}

const create = async (req, res, next) => {
    const transaction = await sequelize.transaction();
    try {
        const roomData = req.body;
        roomData.created_by = req.user.id;
        console.log(roomData);
        const createdRoom = await createRoom(roomData, transaction);

        await createJoin({
            userId: createdRoom.dataValues.created_by,
            roomId: createdRoom.dataValues.id,
            role: "admin",
        }, transaction)

        const participants = roomData.participants;
        for(let i = 0; i < participants.length; i ++){
            const user = await getUserService.getUserByEmail(participants[i])
            if(!user) throw new Error(`ValidationError:Email ${participants[i]} tidak ditemukan`)
            await createJoin({
                userId: user.id,
                roomId: createdRoom.id,
                role:"member"
            },transaction)
        }

        transaction.commit();
        return res.status(200).json(response(200, createdRoom, "Room berhasil dibuat", null));
    } catch (e) {
        transaction.rollback();
        const errorFormat = formatError(e.message);
        return res.status(errorFormat.status).json(errorFormat);
    }
}


export {
    getById,
    create,
    getAllRooms
}