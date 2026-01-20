import express from 'express';
import { messageRouter } from './message.router.js';
import { authRouter } from './auth.router.js'
import { roomRouter } from './room.router.js';
import { verifyCookie } from '../middleware/verifyCookie.middleware.js';
import { userRouter } from './user.router.js';


const router = express.Router();

router.use('/auth', authRouter);

router.use('/message', verifyCookie, messageRouter);
router.use('/room',verifyCookie,roomRouter)
router.use("/user",verifyCookie, userRouter)

export { router };