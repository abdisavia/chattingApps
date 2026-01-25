import { createMessage } from "../services/message/create.service.js";
import response from "../utils/response.js";
import { formatError } from "../validators/ErrorFormat.js";

const saveMessage = async (req, res) => {
    try {
        const messageData = req.body;
        const createdMessage = await createMessage(messageData);

        return res.status(200).json(response(200, createdMessage, "Message sent successfully"))
        
    } catch (e) {
        const errorFormat = formatError(e.message);
        return res.status(errorFormat.status).json(errorFormat);
    }
}

export { saveMessage }