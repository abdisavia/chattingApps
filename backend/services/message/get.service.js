import { models } from "../../model/index.js";
import { messageSchema } from "../../validators/message.validator.js";
export const getAllMessages = async (roomId) => {
    
    const roomIDSchema = messageSchema.extract("roomId");
    const validation = roomIDSchema.validate(roomId);

    if(validation.error) throw new Error(validation.error);

    return await models.Messages.findAll({
        where: {
            roomId:roomId
        },
        order: [["createdAt"]],
        limit: 30
    })
}

export const getLatestMessage = async (roomId) => {

    const roomIDSchema = messageSchema.extract("roomId");
    const validation = roomIDSchema.validate(roomId);

    if(validation.error) throw new Error(validation.error);

    return await models.Messages.findOne({
        where: {
            roomId:roomId
        },
        order: [["createdAt", "DESC"]],
        limit: 1
    })
}