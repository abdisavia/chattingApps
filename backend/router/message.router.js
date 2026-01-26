import express from 'express';
import { saveMessage, getAllMessage} from '../controller/message.controller.js';


const messageRouter = express.Router();

messageRouter.post('/', saveMessage);
messageRouter.get('/:roomId',getAllMessage)
export { messageRouter };