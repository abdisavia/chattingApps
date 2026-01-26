import { createMessage } from "../services/message/create.service.js";
import { getAllMessages } from "../services/message/get.service.js";
import response from "../utils/response.js";
import { formatError } from "../validators/ErrorFormat.js";

const saveMessage = async (req, res) => {
    try {
        const messageData = req.body;
        const createdMessage = await createMessage(messageData);

        return res.status(200).json(response(200, createdMessage.dataValues, "Message Saved to DB"))
        
    } catch (e) {
        const errorFormat = formatError(e.message);
        return res.status(errorFormat.status).json(errorFormat);
    }
}

const getAllMessage = async (req,res) => {
    try{
        
        const { roomId } = req.params;

        console.log(roomId);
        const result = await getAllMessages(roomId);
        const data = result.map(val => {
            return val.dataValues
        });
        return res.status(200).json(response(200, data))

    }catch(e){
        const errorFormat = formatError(e.message);
        return res.status(errorFormat.status).json(errorFormat);
    }
}

export { saveMessage, getAllMessage }