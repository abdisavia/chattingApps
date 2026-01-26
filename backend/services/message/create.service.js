import { models } from "../../model/index.js";
import { messageSchema } from "../../validators/message.validator.js";

export const createMessage = async (messageData, transaction) => {
    // validasi data
    const validation = messageSchema.validate(messageData,{abortEarly:false});
    if (validation.error) throw new Error(validation.error)
    
    //ambil data room
    const selectRoom = await models.Rooms.findByPk(messageData.roomId);
    if (!selectRoom) throw new Error("ValidationError: room tidak ditemukan")

    //ambil user
    const selectUser = await models.users.findByPk(messageData.senderId);
    if (!selectUser) throw new Error("ValidationError: user tidak ditemukan")
    
    return models.Messages.create(messageData, transaction)
}