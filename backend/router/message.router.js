import express from 'express';
import { saveMessage } from '../controller/message.controller.js';


const messageRouter = express.Router();

messageRouter.post('/', saveMessage);
export { messageRouter };