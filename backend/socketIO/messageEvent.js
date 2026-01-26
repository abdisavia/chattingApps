import { createMessage } from "../services/message/create.service.js";
import { formatError } from "../validators/ErrorFormat.js";
import { sequelize } from "../config/dbconfig.js";

export const messageEventHandler = (io, socket) => {
    socket.on("send-message", async (payload, callback) => {
        const transaction = await sequelize.transaction()
        try{
            const { roomId, message, attachmentsId, type } = payload;
            if (!socket.allowedRooms.has(roomId)) throw new Error("Kamu Bukan Anggota Room ini");

            const senderId = socket.userId;

            if(!senderId) throw new Error("Sender id not found");

            const dataMessage = {
                roomId:roomId,
                senderId:senderId,
                type:type,
                message:message,
            }

            if(attachmentsId) dataMessage.attachmentsId = attachmentsId

            const result = await createMessage(dataMessage,transaction);
            const data = result.dataValues
            
            console.log(data)
            transaction.commit()
            io.to(`room:${roomId}`).emit("new-message", data)
        }catch(e){
            transaction.rollback()
            console.error(e.message);
            const formatedError = formatError(e.message).error.split(",");
            callback(formatedError);
        }
    })
}