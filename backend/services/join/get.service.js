import { joinSchema,userRoomId } from "../../validators/join.validator.js";
import { models } from "../../model/index.js";

export const getJoinDataByRoomID = async (roomId) => {
    const validation = joinSchema.validate(roomId);
    if (validation.error) throw new Error(validation.error);
    return await models.Join.findAll({
        where: {
            roomId:roomId
        }
    })
}

export const getJoinDataByUserID = async (userId) => {
    return await models.Join.findAll({
        where: {
            userId:userId
        }
    })
}

export const getJoinDataByUserIDRoomID = async (roomUserData) => {
    const validation = userRoomId.validate(roomUserData);
    if (validation.error) throw new Error(validation.error);
    return await models.Join.findOne({
        where: {
            roomid:roomUserData.roomId,
            userId: roomUserData.userId
        }
    })
}