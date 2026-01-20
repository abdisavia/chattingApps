import { models } from "../../model/index.js";
export const getMessages = async (roomId) => {
    if (!roomId) throw new Error("ValidationError");
    return await models.Messages.findAll({
        where: {
            roomId:roomId
        },
        order: [["createdAt", "DESC"]],
        limit: 30
    })
}