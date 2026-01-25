import { models } from "../../model/index.js";
export const getAllMessages = async (roomId) => {
    if (!roomId) throw new Error("ValidationError");
    return await models.Messages.findAll({
        where: {
            roomId:roomId
        },
        order: [["createdAt", "DESC"]],
        limit: 30
    })
}

export const getLatestMessage = async (roomId) => {
    if (!roomId) throw new Error("ValidationError");
    return await models.Messages.findOne({
        where: {
            roomId:roomId
        },
        order: [["createdAt", "DESC"]],
        limit: 1
    })
}