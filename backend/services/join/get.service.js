import { joinSchema,userRoomId } from "../../validators/join.validator.js";
import { models } from "../../model/index.js";

export const getJoinDataByRoomID = async (roomId) => {
    const roomIdValidation = joinSchema.extract(["roomId"]);
    const validation = roomIdValidation.validate(roomId);
    console.log("Validation Result:", validation);
    if (validation.error) throw new Error(validation.error);
    return await models.Join.findAll({
        where: {
            roomId:roomId,
        }
    })
}

export const getJoinDataByUserID = async (userId) => {
    console.log("UserID in Service:", userId);
    if (!userId) throw new Error("ValidationError: User ID tidak boleh kosong");
    const data =  await models.Join.findAll({
        where: {
            userId:userId
        }
    })
    return data;
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