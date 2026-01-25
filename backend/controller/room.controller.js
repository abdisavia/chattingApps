import { sequelize } from "../config/dbconfig.js";
import { createJoin } from "../services/join/create.service.js";
import { createRoom } from "../services/room/create.service.js";
import response from "../utils/response.js";
import { formatError } from "../validators/ErrorFormat.js";
import { getJoinDataByRoomID, getJoinDataByUserIDRoomID, getJoinDataByUserID } from "../services/join/get.service.js";
import { getRoomByID } from "../services/room/get.service.js";
import { getAllMessages, getLatestMessage } from "../services/message/get.service.js";
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
        
        const messages = await getAllMessages(roomUserData.roomId);
        
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
        
        
        const joinedRooms = await getJoinDataByUserID(userId);
        console.log("Joined Rooms Length:", joinedRooms.length);
        for(let i = 0; i < joinedRooms.length; i++){
            console.log("Joined Rooms: "+joinedRooms[i].dataValues.id);
        }
        if(joinedRooms.length < 1) return res.status(200).json(response(200, null, "Kamu belum buat/masuk ke dalam room manapun"));
        
        const rooms = [];
        for(let i = 0; i < joinedRooms.length; i++){
            const room = await getRoomByID(joinedRooms[i].dataValues.roomId);

            const participants = await getJoinDataByRoomID(room.id);
            const participantsData = [];
            participants?.forEach(async participant => {
                console.log("participant id : "+participant.dataValues.userId);
                const user = await getUserService.getUserById(participant.dataValues.userId)
                if(!user) return null;
                participantsData.push(user.dataValues.name);
            });
            // console.log("Participants Data Promises:", participantsData.then(data => console.log(data)));
            room.dataValues.participants = participantsData? participantsData : [];

            const latestMessage = await getLatestMessage(room.id);
            const latestMessageData = latestMessage?.dataValues ? latestMessage.dataValues : null;
            room.dataValues.latestMessage = latestMessageData;
            rooms.push(room.dataValues);
        }

        console.log("Final Rooms Data:", rooms);

        return res.status(200).json(response(200, rooms, "room berhasil diambil", null));
        
    } catch (e) {
        console.log(e.message);
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