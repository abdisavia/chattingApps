import { models } from "../../model/index.js";
import { messageSchema } from "../../validators/message.validator.js";

export const createMessage = async (messageData) => {
    // Implementation for sending a message
    if (!messageData) throw new Error("ValidationError:Message data is required");
    const validation = messageSchema.validate({abortEarly:false});
    if (validation.error) throw new Error(validation.error.details.map(x => x.message).join(", "))
    
    const selectRoom = await models.Messages.findByPk(messageData.roomId);
    if (!selectRoom) throw new Error("ValidationError: Message should be send to a room")
    const selectUser = await models.users.findByPk(messageData.userId);
    if (!selectUser) throw new Error("ValidationError: Message should be created by a user")
    
    return models.Messages.create(messageData)
}